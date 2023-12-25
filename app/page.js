import Image from 'next/image'
import Chat from './components/Chat'
import SinglePrompt from './components/SinglePrompt'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Chat />
        <SinglePrompt />
      </div>
    </main>
  )
}
