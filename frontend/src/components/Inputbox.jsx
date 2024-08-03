export function InputBox({title,placeholder,onChange}){
    return <div>
        <div className="text-sm font-medium text-left py-2">
        {title}
      </div>
        <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}