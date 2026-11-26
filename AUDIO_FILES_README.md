# Arquivos de Áudio Necessários

Para que o sistema de música funcione, adicione os seguintes arquivos de áudio na pasta principal do projeto:

## Arquivos Esperados

| Matéria | Nome do Arquivo | Série |
|---------|-----------------|-------|
| Ciências Humanas | `ciencias-humanas.mp3` | Carmen Sandiego |
| Ciências da Natureza | `ciencias-natureza.mp3` | Demon Slayer |
| Linguagens | `linguagens.mp3` | Grizzy e os Lemmings |
| Matemática | `matematica.mp3` | Homem-Aranha: Sem Volta para Casa |
| Módulo da Indústria | `modulo-industria.mp3` | One Piece |

## Configurações de Áudio

- **Reprodução**: Automática ao abrir a página da série
- **Loop**: Ativado (a música repete continuamente)
- **Volume**: 30% (0.3)
- **Parada**: Ao clicar no botão "X" para fechar a série

## Como Usar

1. Localize seus arquivos de áudio em formato MP3
2. Renomeie-os conforme a tabela acima
3. Coloque-os na pasta: `c:\Users\beasa\OneDrive\Documentos\NETFLIX VS\`
4. Teste abrindo cada série - a música deve iniciar automaticamente

## Notas

- Se o navegador bloquear a reprodução automática, o áudio aparecerá na console
- O volume está definido em 30% para não atrapalhar a leitura
- Você pode ajustar o volume alterando `audio.volume` no código (valores entre 0 e 1)
- Para desabilitar o loop, remova `audio.loop = true;` do código em serie.html
