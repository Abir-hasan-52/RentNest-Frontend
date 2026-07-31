// components/shared/Logo.tsx
import Link from "next/link"

type LogoProps = {
    className?: string
    iconClassName?: string
    textClassName?: string
    showText?: boolean
}

export function Logo({
    className = "",
    iconClassName = "h-8 w-8 sm:h-9 sm:w-9",
    textClassName = "text-xl sm:text-2xl",
    showText = true,
}: LogoProps) {
    return (
        <Link href="/" className={`flex shrink-0 items-center gap-2 ${className}`}>
            <svg
                viewBox="0 0 40 40"
                className={iconClassName}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    d="M6 24C6 30.6274 12.268 36 20 36C27.732 36 34 30.6274 34 24"
                    className="stroke-primary/30"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d="M10 25.5C10 30.1944 14.4772 34 20 34C25.5228 34 30 30.1944 30 25.5"
                    className="stroke-primary/60"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                />
                <rect x="12" y="17" width="16" height="13" rx="2" className="fill-primary" />
                <path
                    d="M8.5 19L20 8L31.5 19C32.2 19.65 31.75 21 30.75 21H9.25C8.25 21 7.8 19.65 8.5 19Z"
                    className="fill-primary"
                />
                <rect x="17.5" y="23.5" width="5" height="6.5" rx="1" className="fill-background" />
            </svg>

            {showText && (
                <span className={`font-bold tracking-tight text-primary ${textClassName}`}>
                    RentNest
                </span>
            )}
        </Link>
    )
}