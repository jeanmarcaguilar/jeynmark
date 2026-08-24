"use client"

import {
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react"
const useIsStaticRenderer = () => false

// SVG Icons for tech stack
const GithubIcon = () => (
    <svg viewBox="0 0 1024 1024" fill="none" className="w-full h-full">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#fff"/>
    </svg>
)

const GitIcon = () => (
    <svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" className="w-full h-full">
        <path d="M251.17 116.6 139.4 4.82a16.49 16.49 0 0 0-23.31 0l-23.21 23.2 29.44 29.45a19.57 19.57 0 0 1 24.8 24.96l28.37 28.38a19.61 19.61 0 1 1-11.75 11.06L137.28 95.4v69.64a19.62 19.62 0 1 1-16.13-.57V94.2a19.61 19.61 0 0 1-10.65-25.73L81.46 39.44 4.83 116.08a16.49 16.49 0 0 0 0 23.32L116.6 251.17a16.49 16.49 0 0 0 23.32 0l111.25-111.25a16.5 16.5 0 0 0 0-23.33" fill="#DE4C36"/>
    </svg>
)

const HTML5Icon = () => (
    <svg viewBox="0 0 452 520" className="w-full h-full">
        <path fill="#e34f26" d="M41 460L0 0h451l-41 460-185 52"/>
        <path fill="#ef652a" d="M226 472l149-41 35-394H226"/>
        <path fill="#ecedee" d="M226 208h-75l-5-58h80V94H84l15 171h127zm0 147l-64-17-4-45h-56l7 89 117 32z"/>
        <path fill="#fff" d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z"/>
    </svg>
)

const PHPIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M9.749 16.906c-0.733 0-1.266-0.095-1.654-0.265-0.396-0.176-0.689-0.428-0.853-0.732-0.17-0.313-0.233-0.694-0.19-1.12 0.038-0.383 0.138-0.803 0.295-1.242 0.149-0.419 0.357-0.842 0.616-1.253 0.258-0.409 0.568-0.795 0.921-1.148 0.354-0.354 0.753-0.667 1.185-0.931 0.431-0.263 0.903-0.47 1.404-0.614 0.5-0.144 1.033-0.218 1.587-0.218 0.363 0 0.707 0.036 1.024 0.107 0.314 0.071 0.602 0.178 0.856 0.318 0.252 0.14 0.473 0.317 0.654 0.527 0.181 0.211 0.325 0.458 0.425 0.735 0.099 0.276 0.149 0.586 0.149 0.923 0 0.363-0.056 0.751-0.165 1.149-0.109 0.397-0.263 0.792-0.458 1.169-0.194 0.376-0.428 0.737-0.696 1.068-0.267 0.33-0.571 0.629-0.904 0.891-0.332 0.261-0.696 0.479-1.085 0.647-0.388 0.168-0.802 0.294-1.233 0.373-0.429 0.079-0.874 0.12-1.328 0.12zm0.551-5.311c-0.363 0-0.702 0.067-1.009 0.197-0.308 0.131-0.589 0.311-0.835 0.537-0.247 0.226-0.46 0.492-0.633 0.791-0.173 0.299-0.311 0.623-0.409 0.962-0.098 0.339-0.152 0.685-0.159 1.029-0.006 0.344 0.033 0.662 0.117 0.946 0.084 0.283 0.214 0.523 0.387 0.711 0.172 0.187 0.388 0.328 0.642 0.418 0.253 0.089 0.543 0.135 0.865 0.135 0.368 0 0.711-0.068 1.021-0.201 0.309-0.133 0.592-0.315 0.841-0.543 0.249-0.228 0.464-0.496 0.639-0.797 0.175-0.3 0.314-0.625 0.413-0.966 0.099-0.341 0.153-0.688 0.159-1.032 0.006-0.344-0.033-0.662-0.117-0.946-0.084-0.283-0.214-0.523-0.387-0.711-0.172-0.187-0.388-0.328-0.642-0.418-0.253-0.089-0.543-0.135-0.865-0.135zM16.249 16.906c-0.733 0-1.266-0.095-1.654-0.265-0.396-0.176-0.689-0.428-0.853-0.732-0.17-0.313-0.233-0.694-0.19-1.12 0.038-0.383 0.138-0.803 0.295-1.242 0.149-0.419 0.357-0.842 0.616-1.253 0.258-0.409 0.568-0.795 0.921-1.148 0.354-0.354 0.753-0.667 1.185-0.931 0.431-0.263 0.903-0.47 1.404-0.614 0.5-0.144 1.033-0.218 1.587-0.218 0.363 0 0.707 0.036 1.024 0.107 0.314 0.071 0.602 0.178 0.856 0.318 0.252 0.14 0.473 0.317 0.654 0.527 0.181 0.211 0.325 0.458 0.425 0.735 0.099 0.276 0.149 0.586 0.149 0.923 0 0.363-0.056 0.751-0.165 1.149-0.109 0.397-0.263 0.792-0.458 1.169-0.194 0.376-0.428 0.737-0.696 1.068-0.267 0.33-0.571 0.629-0.904 0.891-0.332 0.261-0.696 0.479-1.085 0.647-0.388 0.168-0.802 0.294-1.233 0.373-0.429 0.079-0.874 0.12-1.328 0.12zm0.551-5.311c-0.363 0-0.702 0.067-1.009 0.197-0.308 0.131-0.589 0.311-0.835 0.537-0.247 0.226-0.46 0.492-0.633 0.791-0.173 0.299-0.311 0.623-0.409 0.962-0.098 0.339-0.152 0.685-0.159 1.029-0.006 0.344 0.033 0.662 0.117 0.946 0.084 0.283 0.214 0.523 0.387 0.711 0.172 0.187 0.388 0.328 0.642 0.418 0.253 0.089 0.543 0.135 0.865 0.135 0.368 0 0.711-0.068 1.021-0.201 0.309-0.133 0.592-0.315 0.841-0.543 0.249-0.228 0.464-0.496 0.639-0.797 0.175-0.3 0.314-0.625 0.413-0.966 0.099-0.341 0.153-0.688 0.159-1.032 0.006-0.344-0.033-0.662-0.117-0.946-0.084-0.283-0.214-0.523-0.387-0.711-0.172-0.187-0.388-0.328-0.642-0.418-0.253-0.089-0.543-0.135-0.865-0.135zM7.125 5.25c-0.958 0-1.732 0.774-1.732 1.732v7.536c0 0.958 0.774 1.732 1.732 1.732h9.75c0.958 0 1.732-0.774 1.732-1.732v-7.536c0-0.958-0.774-1.732-1.732-1.732h-9.75z"/>
    </svg>
)

const LaravelIcon = () => (
    <svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 264" className="w-full h-full">
        <path d="m255.9 59.6.1 1.1v56.6c0 1.4-.8 2.8-2 3.5l-47.6 27.4v54.2c0 1.4-.7 2.8-2 3.5l-99.1 57-.7.4-.3.1c-.7.2-1.4.2-2.1 0l-.4-.1-.6-.3L2 206c-1.3-.8-2.1-2.2-2.1-3.6V32.7l.1-1.1.2-.4.3-.6.2-.4.4-.5.4-.3c.2 0 .3-.2.5-.3L51.6.6c1.3-.8 2.9-.8 4.1 0L105.3 29c.2 0 .3.2.4.3l.5.3c0 .2.2.4.3.5l.3.4.3.6.1.4.2 1v106l41.2-23.7V60.7c0-.4 0-.7.2-1l.1-.4.3-.7.3-.3.3-.5.5-.3.4-.4 49.6-28.5c1.2-.7 2.8-.7 4 0L254 57l.5.4.4.3.4.5.2.3c.2.2.2.5.3.7l.2.3Zm-8.2 55.3v-47l-17.3 10-24 13.7v47l41.3-23.7Zm-49.5 85v-47l-23.6 13.5-67.2 38.4v47.5l90.8-52.3ZM8.2 39.9V200l90.9 52.3v-47.5l-47.5-26.9-.4-.4c-.2 0-.3-.1-.4-.3l-.4-.4-.3-.4-.2-.5-.2-.5v-.6l-.2-.5V63.6L25.6 49.8l-17.3-10Zm45.5-31L12.4 32.8l41.3 23.7 41.2-23.7L53.7 8.9ZM75 157.3l24-13.8V39.8l-17.3 10-24 13.8v103.6l17.3-10ZM202.3 36.9 161 60.7l41.3 23.8 41.3-23.8-41.3-23.8Zm-4.1 54.7-24-13.8-17.3-10v47l24 13.9 17.3 10v-47Zm-95 106 60.6-34.5 30.2-17.3-41.2-23.8-47.5 27.4L62 174.3l41.2 23.3Z" fill="#FF2D20"/>
    </svg>
)

const CSSIcon = () => (
    <svg viewBox="0 0 512 512" className="w-full h-full">
        <path fill="#264de4" d="M71.357 460.819 30.272 0h451.456l-41.129 460.746L255.724 512z"/>
        <path fill="#2965f1" d="m405.388 431.408 35.148-393.73H256v435.146z"/>
        <path fill="#ebebeb" d="m124.46 208.59 5.065 56.517H256V208.59zm-5.041-57.875H256V94.197H114.281zM256 355.372l-.248.066-62.944-16.996-4.023-45.076h-56.736l7.919 88.741 115.772 32.14.26-.073z"/>
        <path fill="#fff" d="M255.805 208.59v56.517H325.4l-6.56 73.299-63.035 17.013v58.8l115.864-32.112.85-9.549 13.28-148.792 1.38-15.176 10.203-114.393H255.805v56.518h79.639L330.3 208.59z"/>
    </svg>
)

const MySQLIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.178 0c-2.016 0-3.957 0.375-5.767 1.072-1.844 0.71-3.483 1.726-4.854 3.001-1.395 1.297-2.476 2.802-3.198 4.456-0.734 1.682-1.107 3.503-1.107 5.412 0 1.91 0.373 3.731 1.107 5.413 0.722 1.654 1.803 3.159 3.198 4.456 1.371 1.275 3.01 2.291 4.854 3.001 1.81 0.697 3.751 1.072 5.767 1.072 2.016 0 3.957-0.375 5.767-1.072 1.844-0.71 3.483-1.726 4.854-3.001 1.395-1.297 2.476-2.802 3.198-4.456 0.734-1.682 1.107-3.503 1.107-5.413 0-1.909-0.373-3.73-1.107-5.412-0.722-1.654-1.803-3.159-3.198-4.456-1.371-1.275-3.01-2.291-4.854-3.001C16.135 0.375 14.194 0 12.178 0zm0.823 4.227c0.556 0 1.019 0.463 1.019 1.019v8.975c0 0.556-0.463 1.019-1.019 1.019s-1.019-0.463-1.019-1.019V5.246c0-0.556 0.463-1.019 1.019-1.019zm-4.095 2.047c0.556 0 1.019 0.463 1.019 1.019v6.928c0 0.556-0.463 1.019-1.019 1.019s-1.019-0.463-1.019-1.019V7.293c0-0.556 0.463-1.019 1.019-1.019zm8.19 0c0.556 0 1.019 0.463 1.019 1.019v6.928c0 0.556-0.463 1.019-1.019 1.019s-1.019-0.463-1.019-1.019V7.293c0-0.556 0.463-1.019 1.019-1.019zm-12.285 2.047c0.556 0 1.019 0.463 1.019 1.019v4.881c0 0.556-0.463 1.019-1.019 1.019s-1.019-0.463-1.019-1.019v-4.881c0-0.556 0.463-1.019 1.019-1.019zm16.38 0c0.556 0 1.019 0.463 1.019 1.019v4.881c0 0.556-0.463 1.019-1.019 1.019s-1.019-0.463-1.019-1.019v-4.881c0-0.556 0.463-1.019 1.019-1.019z"/>
    </svg>
)

const LaragonIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
)

const BootstrapIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        <path d="M8 5h3.5c1.93 0 3.5 1.57 3.5 3.5S13.43 12 11.5 12H8V5zm3.5 7c2.485 0 4.5-2.015 4.5-4.5S13.985 3 11.5 3H6v18h3v-7h2.5c1.93 0 3.5 1.57 3.5 3.5S13.43 21 11.5 21H8v-3h3.5c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5H8v-4h3.5z"/>
    </svg>
)

const ReactIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 13.5c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5-0.672 1.5-1.5 1.5z"/>
        <path d="M12 6.3c1.5 0 2.9 0.2 4.1 0.5 0.8-1.6 1.4-3.2 1.6-4.5 0.1-0.5 0-0.9-0.3-1.2-0.3-0.3-0.7-0.4-1.2-0.3-1.3 0.2-2.9 0.8-4.5 1.6-1.6-0.8-3.2-1.4-4.5-1.6-0.5-0.1-0.9 0-1.2 0.3-0.3 0.3-0.4 0.7-0.3 1.2 0.2 1.3 0.8 2.9 1.6 4.5-0.8 1.6-1.4 3.2-1.6 4.5-0.1 0.5 0 0.9 0.3 1.2 0.3 0.3 0.7 0.4 1.2 0.3 1.3-0.2 2.9-0.8 4.5-1.6 1.6 0.8 3.2 1.4 4.5 1.6 0.5 0.1 0.9 0 1.2-0.3 0.3-0.3 0.4-0.7 0.3-1.2-0.2-1.3-0.8-2.9-1.6-4.5-0.8-1.6-1.4-3.2-1.6-4.5-0.1-0.5 0-0.9 0.3-1.2 0.3-0.3 0.7-0.4 1.2-0.3 1.3 0.2 2.9 0.8 4.5 1.6 1.6-0.8 3.2-1.4 4.5-1.6 0.5-0.1 0.9 0 1.2 0.3 0.3 0.3 0.4 0.7 0.3 1.2-0.2 1.3-0.8 2.9-1.6 4.5zM12 17.7c-1.5 0-2.9-0.2-4.1-0.5-0.8 1.6-1.4 3.2-1.6 4.5-0.1 0.5 0 0.9 0.3 1.2 0.3 0.3 0.7 0.4 1.2 0.3 1.3-0.2 2.9-0.8 4.5-1.6 1.6 0.8 3.2 1.4 4.5 1.6 0.5 0.1 0.9 0 1.2-0.3 0.3-0.3 0.4-0.7 0.3-1.2-0.2-1.3-0.8-2.9-1.6-4.5-0.8-1.6-1.4-3.2-1.6-4.5-0.1-0.5 0-0.9 0.3-1.2 0.3-0.3 0.7-0.4 1.2-0.3 1.3 0.2 2.9 0.8 4.5 1.6 1.6-0.8 3.2-1.4 4.5-1.6 0.5-0.1 0.9 0 1.2 0.3 0.3 0.3 0.4 0.7 0.3 1.2-0.2 1.3-0.8 2.9-1.6 4.5z"/>
    </svg>
)

const TailwindIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 0.913 0.228 1.565 0.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-0.913-0.228-1.565-0.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 0.913 0.228 1.565 0.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-0.913-0.228-1.565-0.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
    </svg>
)

const DEFAULT_SLIDES = [
    {
        icon: <GithubIcon />,
        title: "GitHub\nVersion\nControl",
    },
    {
        icon: <GitIcon />,
        title: "Git\nDistributed\nVersion",
    },
    {
        icon: <HTML5Icon />,
        title: "HTML5\nWeb\nStructure",
    },
    {
        icon: <PHPIcon />,
        title: "PHP\nServer\nScripting",
    },
    {
        icon: <LaravelIcon />,
        title: "Laravel\nPHP\nFramework",
    },
    {
        icon: <CSSIcon />,
        title: "CSS\nStyling\nDesign",
    },
    {
        icon: <MySQLIcon />,
        title: "MySQL\nDatabase\nManagement",
    },
    {
        icon: <LaragonIcon />,
        title: "Laragon\nLocal\nServer",
    },
    {
        icon: <BootstrapIcon />,
        title: "Bootstrap\nUI\nFramework",
    },
    {
        icon: <ReactIcon />,
        title: "React\nComponent\nFramework",
    },
    {
        icon: <TailwindIcon />,
        title: "Tailwind\nUtility\nCSS",
    },
]

// Fixed internals (no longer exposed as controls).
const PERSPECTIVE = 1600
const SCALE_STEP = 0.16
const MAX_VISIBLE = 2
const DEPTH = 240

function cssTransition(t) {
    const dur = t && typeof t.duration === "number" ? t.duration : 0.6
    let ease = "cubic-bezier(0.22, 1, 0.36, 1)"
    const e = t?.ease
    if (Array.isArray(e) && e.length === 4) {
        ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})` 
    } else if (typeof e === "string") {
        const map = {
            linear: "linear",
            easeIn: "ease-in",
            easeOut: "ease-out",
            easeInOut: "ease-in-out",
        }
        ease = map[e] || "ease"
    }
    return { dur, ease }
}

export default function Skills() {
    const props = { ...COMPONENT_DEFAULTS }
    const {
        slides = DEFAULT_SLIDES,
        cardWidth = 557,
        cardHeight = 420,
        radius = 0,
        tilt = 7,
        sideTilt = 7,
        gap = 18,
        opacity = 0,
        transition,
        autoplay = true,
        autoplayDirection = "rightToLeft",
        showTitle = false,
        titleFont,
        titleColor = "#ffffff",
        titlePosition,
        style,
        speed = 1,
    } = props

    const tp = titlePosition || {}
    const corner = tp.position || "bottomLeft"
    const isTop = corner === "topLeft" || corner === "topRight"
    const isRight = corner === "topRight" || corner === "bottomRight"
    const padLeft = tp.paddingLeft ?? 22
    const padRight = tp.paddingRight ?? 22
    const padTop = tp.paddingTop ?? 24
    const padBottom = tp.paddingBottom ?? 24

    const isStatic = useIsStaticRenderer()
    const list = slides && slides.length ? slides : DEFAULT_SLIDES
    const n = list.length

    const loop = true
    const [active, setActive] = useState(0)

    useEffect(() => {
        setActive((a) => Math.max(0, Math.min(n - 1, a)))
    }, [n])

    const moveDur =
        transition && typeof transition.duration === "number"
            ? transition.duration / speed
            : 0.6 / speed
    const lockRef = useRef(false)
    const lock = useCallback(() => {
        lockRef.current = true
        window.setTimeout(
            () => {
                lockRef.current = false
            },
            Math.max(50, moveDur * 1000)
        )
    }, [moveDur])

    const step = useCallback(
        (dir) => {
            if (lockRef.current) return
            lock()
            setActive((a) => (((a + dir) % n) + n) % n)
        },
        [n, lock]
    )

    const handleCardClick = useCallback(
        (i) => {
            if (isStatic || autoplay || lockRef.current) return
            lock()
            setActive((a) => (i === a ? (a + 1) % n : i))
        },
        [isStatic, autoplay, n, lock]
    )

    const delay =
        transition && typeof transition.delay === "number"
            ? transition.delay / speed
            : 2.5 / speed
    useEffect(() => {
        if (isStatic || !autoplay || n < 2) return
        const ms = Math.max(0.3, delay) * 1000
        const dir = autoplayDirection === "leftToRight" ? -1 : 1
        const id = window.setInterval(() => step(dir), ms)
        return () => window.clearInterval(id)
    }, [isStatic, autoplay, autoplayDirection, delay, n, step])

    const onKeyDown = useCallback(
        (e) => {
            if (e.key === "ArrowRight") {
                e.preventDefault()
                step(1)
            } else if (e.key === "ArrowLeft") {
                e.preventDefault()
                step(-1)
            }
        },
        [step]
    )

    const { dur, ease } = cssTransition({
        ...transition,
        duration: (transition?.duration || 0.6) / speed
    })
    const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}` 

    const effectiveRadius =
        (Math.max(0, Math.min(20, radius)) / 20) *
        (Math.min(cardWidth, cardHeight) / 2)
    const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100

    const rootStyle = {
        ...(style || {}),
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 320,
        minHeight: 360,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: `${PERSPECTIVE}px`,
        overflow: "hidden",
        outline: "none",
    }

    return (
        <section id="skills" className="pt-24 sm:pt-36 pb-32 sm:pb-48 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-8 sm:mb-12 text-center">Technical Skills</h2>
                
                <div
                    style={rootStyle}
                    tabIndex={0}
                    role="group"
                    aria-roledescription="carousel"
                    onKeyDown={isStatic ? undefined : onKeyDown}
                    className="h-125"
                >
                    <div
                        style={{
                            position: "relative",
                            width: cardWidth,
                            height: cardHeight,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {list.map((slide, i) => {
                            let rel = i - active
                            if (loop) {
                                if (rel > n / 2) rel -= n
                                if (rel < -n / 2) rel += n
                            }
                            const ax = Math.abs(rel)
                            const visible = ax <= MAX_VISIBLE
                            const isActive = rel === 0
                            const sc = Math.max(0.4, 1 - ax * SCALE_STEP)
                            const tx = rel * (gap * 30)
                            const tz = -ax * DEPTH
                            const ry = -rel * tilt
                            const rz = rel * sideTilt
                            const rx = rel * rel * 5 // Add X rotation for curvature
                            const icon = slide.icon || null

                            const cardStyle = {
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                width: cardWidth,
                                height: cardHeight,
                                borderRadius: effectiveRadius,
                                overflow: "hidden",
                                transformStyle: "preserve-3d",
                                transformOrigin: "center center",
                                transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                                transition: transitionCss,
                                opacity: visible ? 1 : 0,
                                cursor: autoplay || isActive ? "default" : "pointer",
                                pointerEvents:
                                    visible && !isStatic && !autoplay ? "auto" : "none",
                                backgroundColor: "#1a1a1a",
                            }

                            return (
                                <div
                                    key={i}
                                    style={cardStyle}
                                    onClick={
                                        isStatic ? undefined : () => handleCardClick(i)
                                    }
                                    aria-label={slide.title}
                                    aria-hidden={!visible}
                                >
                                    {icon ? (
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: "40px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    color: "#ffffff",
                                                }}
                                            >
                                                {icon}
                                            </div>
                                        </div>
                                    ) : null}

                                    {showTitle && (
                                        <>
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    background: isTop
                                                        ? "linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.7) 100%)"
                                                        : "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.7) 100%)",
                                                    pointerEvents: "none",
                                                }}
                                            />

                                            <div
                                                style={{
                                                    position: "absolute",
                                                    left: padLeft,
                                                    right: padRight,
                                                    [isTop ? "top" : "bottom"]: isTop
                                                        ? padTop
                                                        : padBottom,
                                                    textAlign: isRight
                                                        ? "right"
                                                        : "left",
                                                    pointerEvents: "none",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: titleColor,
                                                        fontSize: 28,
                                                        fontWeight: 700,
                                                        lineHeight: "1.1em",
                                                        letterSpacing: "-0.02em",
                                                        whiteSpace: "pre-line",
                                                        textShadow:
                                                            "0 2px 10px rgba(0,0,0,0.4)",
                                                        ...(titleFont || {}),
                                                    }}
                                                >
                                                    {slide.title}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "#000000",
                                            opacity: isActive ? 0 : dim,
                                            transition: `opacity ${dur}s ${ease}`,
                                            pointerEvents: "none",
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

const COMPONENT_DEFAULTS = {
    slides: [
        {
            icon: <GithubIcon />,
            title: "GitHub\nVersion\nControl",
        },
        {
            icon: <GitIcon />,
            title: "Git\nDistributed\nVersion",
        },
        {
            icon: <HTML5Icon />,
            title: "HTML5\nWeb\nStructure",
        },
        {
            icon: <PHPIcon />,
            title: "PHP\nServer\nScripting",
        },
        {
            icon: <LaravelIcon />,
            title: "Laravel\nPHP\nFramework",
        },
        {
            icon: <CSSIcon />,
            title: "CSS\nStyling\nDesign",
        },
        {
            icon: <MySQLIcon />,
            title: "MySQL\nDatabase\nManagement",
        },
        {
            icon: <LaragonIcon />,
            title: "Laragon\nLocal\nServer",
        },
        {
            icon: <BootstrapIcon />,
            title: "Bootstrap\nUI\nFramework",
        },
        {
            icon: <ReactIcon />,
            title: "React\nComponent\nFramework",
        },
        {
            icon: <TailwindIcon />,
            title: "Tailwind\nUtility\nCSS",
        },
    ],
    cardWidth: 400,
    cardHeight: 400,
    radius: 3,
    tilt: 20,
    sideTilt: 15,
    gap: 30,
    opacity: 60,
    autoplay: true,
    autoplayDirection: "rightToLeft",
    transition: {
        type: "tween",
        duration: 0.6,
        delay: 6,
        ease: [0.22, 1, 0.36, 1],
    },
    showTitle: true,
    titleFont: {
        fontFamily: "Inter",
        variant: "Bold",
        fontSize: "28px",
        letterSpacing: "-0.02em",
        lineHeight: "1.1em",
    },
    titleColor: "#ffffff",
    titlePosition: {
        position: "bottomLeft",
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 24,
        paddingBottom: 24,
    },
    speed: 3,
}