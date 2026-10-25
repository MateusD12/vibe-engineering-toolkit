---
name: voz-audio-local
description: Geração local de voz e síntese de áudio (TTS/STT inspirado no VoiceStudio/Kokoro/Piper) com custo zero de tokens. Cria falas de NPCs para mods de jogos, locução para Mesa TCG, coaching de voz para FitQuest e audiodescrição.
---

# Síntese e Processamento de Áudio Local ($0 ElevenLabs)

Inspirado no **VoiceStudio** e em motores modernos ultraleves de síntese neural como **Kokoro-82M** e **Piper TTS**, este módulo permite gerar voz humana realista e transcrições 100% offline, sem gastar tokens ou assinaturas de serviços na nuvem.

---

## 1. Por que Áudio Local?
- **Zero Custo:** Alternativa open-source a serviços caros como ElevenLabs ou OpenAI Audio TTS.
- **Latência Quase Nula:** Síntese em tempo real gerada direto na CPU ou GPU da máquina de desenvolvimento.
- **Offline & Seguro:** Nenhuma amostra de áudio ou texto sai da sua máquina.

---

## 2. Ferramentas Recomendadas no Ecossistema

| Motor / Modelo | Especialidade | Consumo de Hardware | Uso Recomendado |
| :--- | :--- | :--- | :--- |
| **Kokoro-82M** | Qualidade extrema estilo ElevenLabs em apenas 82M parâmetros | ~300 MB RAM (ultrarrápido na CPU) | Narração de lore, locutor do Mesa TCG, voz de NPC em mods |
| **Piper TTS** | Síntese neural rápida e ultraleve C++ | ~50 MB RAM | Contagens regressivas do FitQuest, feedback sonoro de apps |
| **Whisper (faster-whisper)** | Transcrição de áudio para texto (STT) | ~150-500 MB RAM | Ditado por voz, transcrição de vídeos e comandos sonoros |

---

## 3. Aplicação Direta nos Nossos Projetos

### 🃏 1. Mesa TCG
- **Locutor da Partida:** Avisos de etapas sonoros ("Fase de Combate", "Iniciando Turno 4").
- **Áudio Lore:** Narração da história das cartas lendárias ao passar o mouse ou inspecionar o modelo 3D.

### 🏋️‍♂️ 2. FitQuest
- **Coach por Voz:** Contagem de descanso entre séries ("Descanse por 45 segundos... 3, 2, 1, comece!").
- **Feedback Auditivo:** Avisos de postura e incentivos sem que o usuário precise olhar para a tela do celular enquanto treina.

### 🎮 3. Engenharia Reversa e Mods de Jogos
- **Vozes de NPCs e Diálogos:** Inserção de falas personalizadas em missões criadas por modding sem depender de dublagem manual cara.
- **Localização / Dublagem:** Tradução e redublagem de jogos clássicos para português brasileiro.

---

## 4. Exemplo de Uso com Kokoro em Python

```python
# Instalação rápida: pip install kokoro soundfile
from kokoro import KPipeline
import soundfile as sf

# Inicializa pipeline em português ou inglês
pipeline = KPipeline(lang_code='b') # ou 'a' para inglês americano
text = "Bem-vindo ao Mesa TCG. Seu turno começou."

generator = pipeline(text, voice='af_heart', speed=1.0)
for i, (gs, ps, audio) in enumerate(generator):
    sf.write(f'anuncio_{i}.wav', audio, 24000)
    print("Áudio gerado com sucesso!")
```
