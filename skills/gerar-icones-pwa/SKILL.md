---
name: gerar-icones-pwa
description: Gera icones PWA (192/512 e derivados) a partir de um SVG. Use junto de configurar-pwa.
---

# Skill: Gerar Ícones PWA

## Quando usar
- Criando um novo app web que precisa de ícones PWA
- O usuário quer trocar os ícones de um app existente
- Executar ANTES do skill `configurar-pwa`

## Tamanhos obrigatórios

| Arquivo | Tamanho | Uso |
|---------|---------|-----|
| `icon-72.png` | 72×72 | Android legacy |
| `icon-96.png` | 96×96 | Favicon desktop |
| `icon-128.png` | 128×128 | Chrome Web Store |
| `icon-144.png` | 144×144 | Windows tile |
| `icon-152.png` | 152×152 | iPad retina |
| `icon-192.png` | 192×192 | Android home screen (maskable) |
| `icon-384.png` | 384×384 | Android splash |
| `icon-512.png` | 512×512 | Android splash / PWA install (maskable) |
| `apple-touch-icon.png` | 180×180 | iOS home screen |
| `favicon.ico` | 32×32 | Browser tab |

---

## Opção A — Gerar com Python (Pillow) a partir de uma imagem base

Use quando o usuário fornecer uma imagem de origem (PNG, JPG, qualquer tamanho ≥ 512px).

```python
# gerar_icones.py — rodar uma vez, depois pode deletar
from PIL import Image
from pathlib import Path

ORIGEM = "icon-original.png"   # imagem base fornecida pelo usuário
DESTINO = Path("public/icons")
DESTINO.mkdir(parents=True, exist_ok=True)

TAMANHOS = [72, 96, 128, 144, 152, 192, 384, 512]

img = Image.open(ORIGEM).convert("RGBA")

for tamanho in TAMANHOS:
    redimensionada = img.resize((tamanho, tamanho), Image.LANCZOS)
    redimensionada.save(DESTINO / f"icon-{tamanho}.png", "PNG")
    print(f"✓ icon-{tamanho}.png")

# Apple touch icon
img.resize((180, 180), Image.LANCZOS).save(DESTINO / "apple-touch-icon.png", "PNG")
print("✓ apple-touch-icon.png")

# Favicon (ICO com múltiplas resoluções)
favicon = img.resize((32, 32), Image.LANCZOS).convert("RGB")
favicon.save("public/favicon.ico", "ICO", sizes=[(16, 16), (32, 32)])
print("✓ favicon.ico")

print(f"\nTodos os ícones gerados em {DESTINO.resolve()}")
```

**Instalar dependência:**
```bash
pip install Pillow
```

**Usar:**
1. Colocar a imagem base na raiz do projeto com o nome `icon-original.png`
2. Rodar `python gerar_icones.py`
3. Os ícones aparecem em `public/icons/`

---

## Opção B — Gerar com sharp (Node.js)

Use quando já está em ambiente Node e não quer instalar Python.

```javascript
// scripts/generate-icons.mjs
import sharp from 'sharp'
import { mkdirSync } from 'fs'

const origem = 'icon-original.png'
const destino = 'public/icons'
mkdirSync(destino, { recursive: true })

const tamanhos = [72, 96, 128, 144, 152, 192, 384, 512]

for (const tamanho of tamanhos) {
  await sharp(origem)
    .resize(tamanho, tamanho)
    .png()
    .toFile(`${destino}/icon-${tamanho}.png`)
  console.log(`✓ icon-${tamanho}.png`)
}

await sharp(origem).resize(180, 180).png().toFile(`${destino}/apple-touch-icon.png`)
console.log('✓ apple-touch-icon.png')

await sharp(origem).resize(32, 32).toFile('public/favicon.ico')
console.log('✓ favicon.ico')
```

```bash
npm install -D sharp
node scripts/generate-icons.mjs
```

---

## Opção C — Sem imagem base (criar ícone placeholder)

Quando o usuário ainda não tem um ícone e quer continuar o desenvolvimento:

```python
# gerar_icones_placeholder.py
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

COR_FUNDO = "#1a1a2e"      # ajustar para a cor do app
COR_TEXTO = "#ffffff"
LETRA = "B"                 # inicial do app
DESTINO = Path("public/icons")
DESTINO.mkdir(parents=True, exist_ok=True)

TAMANHOS = [72, 96, 128, 144, 152, 192, 384, 512]

def criar_icone(tamanho: int) -> Image.Image:
    img = Image.new("RGBA", (tamanho, tamanho), COR_FUNDO)
    draw = ImageDraw.Draw(img)
    font_size = int(tamanho * 0.55)
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        font = ImageFont.load_default()
    bbox = draw.textbbox((0, 0), LETRA, font=font)
    x = (tamanho - (bbox[2] - bbox[0])) // 2
    y = (tamanho - (bbox[3] - bbox[1])) // 2
    draw.text((x, y), LETRA, fill=COR_TEXTO, font=font)
    return img

for tamanho in TAMANHOS:
    criar_icone(tamanho).save(DESTINO / f"icon-{tamanho}.png")
    print(f"✓ icon-{tamanho}.png")

criar_icone(180).save(DESTINO / "apple-touch-icon.png")
criar_icone(32).convert("RGB").save("public/favicon.ico", "ICO")
print("Ícones placeholder gerados — substitua por arte final depois")
```

---

## Notas sobre ícones maskable (Android)

Ícones 192 e 512 marcados como `maskable` no manifest são cortados em círculo/forma pelo Android. A arte deve ter **safe zone de 20%** — o conteúdo principal deve ficar nos 60% centrais da imagem. Se o ícone tiver logo nas bordas, criar versão separada com padding.

## Verificação final
- Abrir `public/icons/` e confirmar que todos os arquivos existem
- Verificar se `favicon.ico` aparece na aba do browser ao rodar `npm run dev`
- No Chrome DevTools → Application → Manifest → verificar se os ícones carregam sem erro 404
