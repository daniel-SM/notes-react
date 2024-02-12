import { ChangeEvent } from "react"

interface SearchNoteProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

export function SearchNote ({ handleSearch }: SearchNoteProps) {
  return (
    <form className="w-full">
      <input 
        type="text" 
        placeholder="Busque em suas notas..." 
        className="w-full bg-transparent text-3xl font-semibold outline-none placeholder:text-slate-500"
        onChange={handleSearch}
      />
    </form>
  )
}