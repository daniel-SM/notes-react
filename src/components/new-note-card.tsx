import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"

export function NewNoteCard () {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [content, setContent] = useState("")

  function handleStartEditor() {
    setShowOnboarding(false)
  }

  function handleCloseEditor() {
    setShowOnboarding(true)
  }

  function handleContentChanged (event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value === "") {
      setShowOnboarding(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    console.log(content)
    if (!showOnboarding) {
      toast.success("Nota criada com sucesso!")
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
        <Dialog.DialogContent className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close onClick={handleCloseEditor} className="absolute top-0 right-0 p-1.5 rounded-sm text-slate-400 bg-slate-800 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className="flex flex-col flex-1">
            <div className="flex flex-1 flex-col p-3 gap-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {showOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece <button className="font=medium text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEditor} className="font=medium text-lime-400 hover:underline">utilize apenas texto</button>.
                </p>
              ) : (
                <textarea 
                  autoFocus 
                  className="text-sm leading-6 flex-1 resize-none outline-none bg-transparent text-slate-400"
                  onChange={handleContentChanged}
                />
              )}
            </div>

            <button type="submit" className="w-full py-4 text-center text-sm font-medium text-lime-950 bg-lime-400 hover:bg-lime-500">
              Salvar nota
            </button>
          </form>
        </Dialog.DialogContent>
      </Dialog.Portal>

    </Dialog.Root>
  )
}