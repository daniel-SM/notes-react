import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard ({ onNoteCreated }: NewNoteCardProps) {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [content, setContent] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  function handleStartEditor() {
    setShowOnboarding(false)
  }

  function handleCloseEditor() {
    setShowOnboarding(true)
    setContent("")
  }

  function handleContentChanged (event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value === "") {
      setShowOnboarding(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if (content !== "") {
      onNoteCreated(content)

      setContent("")
      setShowOnboarding(true)

      toast.success("Nota criada com sucesso!")

    } else {
      toast.error("Adicione conteúdo na nota!")
    }
  }

  function handleStartRecording () {
    const isSpeechRecognitionAvaliable = "SpeechRecognition" in window || "webkitSpeechRecognition" in window
    
    if (!isSpeechRecognitionAvaliable) {
      alert("Infelizmente seu navegador não suporta a ferramenta de gravação!")
      return
    }
    
    setIsRecording(true)
    setShowOnboarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition 

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = "pt-BR"
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, "")

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  function handleStopRecording () {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col gap-3 rounded-md text-left p-5 bg-slate-700 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.DialogContent className="fixed overflow-hidden flex flex-col outline-none w-full inset-0 bg-slate-700 md:inset-auto md:rounded-md md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh]">
          <Dialog.Close onClick={handleCloseEditor} className="absolute top-0 right-0 p-1.5 rounded-sm text-slate-400 bg-slate-800 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex flex-col flex-1">
            <div className="flex flex-1 flex-col p-3 gap-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {showOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece <button type="button" onClick={handleStartRecording} className="font=medium text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={handleStartEditor} className="font=medium text-lime-400 hover:underline">utilize apenas texto</button>.
                </p>
              ) : (
                <textarea 
                  autoFocus 
                  className="text-sm leading-6 flex-1 resize-none outline-none bg-transparent text-slate-400"
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button 
                type="button" 
                onClick={handleStopRecording} 
                className="w-full py-4 flex items-center justify-center gap-2 text-center text-sm font-medium outline-none text-slate-300 bg-slate-900 hover:text-slate-100"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse"/>
                Gravando! (clique para interromper)
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleSaveNote} 
                className="w-full py-4 text-center text-sm font-medium outline-none text-lime-950 bg-lime-400 hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.DialogContent>
      </Dialog.Portal>

    </Dialog.Root>
  )
}