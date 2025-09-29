import React from 'react'
import { useSubscribeDev } from '@subscribe.dev/react'
import './App.css'

function SignInScreen({ signIn }: { signIn: () => void }) {
  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h1>Digital Clock App</h1>
        <p className="sign-in-message">Please sign in to access the clock and features</p>
        <button onClick={signIn} className="sign-in-button">
          Sign In
        </button>
      </div>
    </div>
  )
}

function ClockApp() {
  const { signOut, user, usage, subscriptionStatus, subscribe } = useSubscribeDev()

  return (
    <div className="clock-app">
      <header className="app-header">
        <div className="user-info">
          {user?.avatarUrl && (
            <img src={user.avatarUrl} alt="User avatar" className="user-avatar" />
          )}
          <span className="user-email">{user?.email}</span>
        </div>
        <button onClick={signOut} className="sign-out-button">
          Sign Out
        </button>
      </header>

      <main className="clock-container">
        <DigitalClock />
      </main>

      <footer className="app-footer">
        <div className="status-panel">
          <div className="status-card">
            <h3>Plan Status</h3>
            <p className="plan-name">{subscriptionStatus?.plan?.name ?? 'Free'}</p>
            <p className="plan-status">{subscriptionStatus?.status ?? 'none'}</p>
          </div>

          <div className="status-card">
            <h3>Usage</h3>
            <p className="credits-info">
              <span className="credits-remaining">{usage?.remainingCredits ?? 0}</span>
              <span className="credits-label"> / {usage?.allocatedCredits ?? 0} credits</span>
            </p>
            <div className="credits-bar">
              <div
                className="credits-bar-fill"
                style={{
                  width: `${usage ? (usage.remainingCredits / usage.allocatedCredits) * 100 : 0}%`
                }}
              />
            </div>
          </div>

          <div className="status-card">
            <h3>Subscription</h3>
            <button onClick={subscribe!} className="manage-button">
              Manage Subscription
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DigitalClock() {
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const seconds = time.getSeconds().toString().padStart(2, '0')

  const date = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="digital-clock">
      <div className="time-display">
        <span className="time-segment">{hours}</span>
        <span className="time-separator">:</span>
        <span className="time-segment">{minutes}</span>
        <span className="time-separator">:</span>
        <span className="time-segment">{seconds}</span>
      </div>
      <div className="date-display">{date}</div>
    </div>
  )
}

function App() {
  const { isSignedIn, signIn } = useSubscribeDev()

  if (!isSignedIn) {
    return <SignInScreen signIn={signIn} />
  }

  return <ClockApp />
}

export default App
