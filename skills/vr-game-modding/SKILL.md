---
name: vr-game-modding
description: Especialista em conversão de jogos planos (flat screen) para Realidade Virtual (VR 6DOF), injeção de OpenXR/OpenVR, desacoplamento de câmera, perfis UEVR (Unreal Engine) e mapeamento de controles de movimento. Use ao portar, adaptar ou criar mods de VR para jogos de PC.
---

# Conversão de Jogos para Realidade Virtual (VR 6DOF)

Guia de engenharia para converter jogos convencionais (flat) para Realidade Virtual imersiva com suporte a 6 Graus de Liberdade (6DOF) na cabeça e nos controles de movimento (DualSense VR, Meta Quest Touch, Valve Index, etc.).

---

## 1. As Duas Principais Rotas de Implementação

### Rota A: Jogos em Unreal Engine 4 e 5 (Via UEVR)
Para qualquer título construído na Unreal Engine (de jogos indies a produções AAA):
- **Ferramenta Central:** **UEVR (Praydog)** — framework universal de injeção que expõe internamente os ponteiros de câmera, `UWorld`, `APlayerController` e matrizes de projeção.
- **Configuração de Perfis UEVR:**
  1. **Camera Decoupling:** Desacoplar a rotação da cabeça (HMD) da orientação da malha do jogador. A mira/cabeça olha para onde o HMD aponta sem forçar o corpo a girar bruscamente.
  2. **Attach de Armas / Mãos (6DOF):** Localizar o socket ou componente da arma (`Mesh1P` ou `WeaponMesh`) e vinculá-lo ao `RightController` com offsets de rotação e escala ajustados.
  3. **Interface e HUD:** Fixar o HUD no espaço do mundo (World Space) a uma distância confortável (ex: 2.0m à frente com leve curvatura) em vez de deixá-lo colado na tela estéreo.

### Rota B: Jogos Nativos C/C++, DirectX 11/12 ou Vulkan (Via OpenXR)
Para jogos customizados ou que usam engines proprietárias (Titanfall 2, Resident Evil, Source Engine, etc.):
- **Runtime Padrão:** **OpenXR** (o padrão moderno suportado por Meta, SteamVR, Varjo e Windows Mixed Reality).
- **Pipeline de Interceptação Gráfica:**
  1. **DLL Proxying / Hook de Apresentação:** Interceptar chamadas `IDXGISwapChain::Present` (DirectX) ou `vkQueuePresentKHR` (Vulkan).
  2. **Renderização Estéreo:** Criar duas visualizações (Olho Esquerdo e Olho Direito) via `xrLocateViews`, alterando as matrizes de projeção e translação ocular (Interpupillary Distance - IPD).
  3. **Compositor de Profundidade:** Passar o buffer de profundidade (`DepthBuffer`) do jogo para o compositor OpenXR via `XR_KHR_composition_layer_depth`, garantindo reprojeção assíncrona (ASW / Motion Smoothing) sem artefatos.

---

## 2. Desacoplamento da Câmera & Vetores de Movimento

Em um jogo plano convencional, o vetor da câmera define tanto o campo visual quanto a direção do movimento do personagem:
$$\vec{V}_{\text{movimento}} = f(\theta_{\text{camera}}, \text{input})$$

Na Realidade Virtual, **a cabeça é independente do corpo**:
1. **Head-Relative vs. Controller-Relative:** Permitir que o jogador escolha mover-se na direção para onde a cabeça aponta ou na direção para onde o controle da mão esquerda aponta.
2. **Pitch / Roll Locking:** O jogo original tenta aplicar inclinações verticais (pitch) e balanço de caminhada (head bobbing/roll) na câmera. **Estes balanços devem ser zerados no HMD** para evitar cinetose (enjoo de movimento).

---

## 3. Mapeamento de Controles de Movimento (6DOF Hands)

1. **Localização de Posição/Orientação:** Obter poses dos controles através de `xrSyncActions` e `xrGetActionStatePose`.
2. **Injeção de Posição de Disparo:**
   - Em vez de calcular o tiro a partir do centro da tela (`ScreenCenterRaycast`), substituir a origem do raio pela ponta do cano da arma mapeada no controle:
     $$\text{Ray}_{\text{tiro}} = \text{Pose}_{\text{RightHand}} + \vec{O}_{\text{cano}}$$
3. **Interação com Duas Mãos:** Suporte a estabilização de miras ao segurar o rifle com a mão esquerda (cálculo de vetor entre `LeftHand` e `RightHand`).

---

## 4. Otimização & Conforto

- **Taxa de Quadros Rígida:** O jogo DEVE sustentar a taxa nativa do headset (72Hz, 90Hz ou 120Hz). Quedas de frame em VR causam náusea imediata.
- **DLSS / FSR / XeSS:** Ativar upscalers temporais nos backends gráficos para aliviar a carga de renderização estéreo simultânea em alta resolução.
- **Vignette Dinâmico:** Escurecer sutilmente as bordas da visão periférica durante movimentos rápidos ou acelerações se o usuário ativar o modo de conforto.
