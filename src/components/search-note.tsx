export function SearchNote () {
  return (
    <form className="w-full">
      <input 
        type="text" 
        placeholder="Busque em suas notas..." 
        className="w-full bg-transparent text-3xl font-semibold outline-none placeholder:text-slate-500"
      />
    </form>
  )
}