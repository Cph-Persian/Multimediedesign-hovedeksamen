import SocraticChat from '../components/SocraticChat.jsx'

/**
 * ChatPage — den eneste arbejdsflade. Wrapper omkring SocraticChat.
 */

export default function ChatPage() {
  return (
    <div className="flex-1 min-h-0 flex flex-col p-4 sm:p-6 overflow-hidden">
      <div className="flex-1 min-h-0 max-w-4xl w-full mx-auto flex flex-col">
        <SocraticChat />
      </div>
    </div>
  )
}
