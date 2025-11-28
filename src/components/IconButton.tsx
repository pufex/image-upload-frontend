type ButtonProps = {
    type?: "submit" | "button",
    disabled?: boolean,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    className?: string,
    children?: React.ReactNode 
}

export default function IconButton ({type = "button", disabled, onClick, className, children}: ButtonProps){
    return <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`${className} w-10 h-10 text-white font-semibold text-xl border-2 border-blue-800 rounded-lg flex items-center justify-center gap-2 ${disabled ? "bg-blue-300 border-blue-500 cursor-not-allowed" : "cursor-pointer bg-blue-600 hover:bg-blue-500 active:bg-blue-400"}`}
    >
        {children}
    </button>
}