import * as Dialog from "@radix-ui/react-dialog"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { X } from "lucide-react"

interface NoteCardProps {
  note: {
    id: string,
    date: Date,
    content: string,
  }
  onNoteDeleted: (id: string) => void
}

export function NoteCard ({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative flex flex-col gap-3 rounded-md text-left p-5 overflow-hidden bg-slate-800 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
        </span>
        <p className="text-sm leading-6 text-slate-400">
          {note.content}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.DialogContent className="fixed overflow-hidden flex flex-col outline-none inset-0 bg-slate-700 md:inset-auto md:rounded-md md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh]">
          <Dialog.Close className="absolute top-0 right-0 p-1.5 rounded-sm text-slate-400 bg-slate-800 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col p-3 gap-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
            </span>
            <p className="text-sm leading-6 text-slate-400">
              {note.content}
            </p>
          </div>

          <button 
            type="button" 
            onClick={() => onNoteDeleted(note.id)}
            className="w-full py-4 text-center text-sm font-medium group text-slate-300 bg-slate-800"
          >
            Deseja <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
          </button>
        </Dialog.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}