"use client";
import Image from 'next/image'
import styles from './page.module.css'
import Calendar from "@/app/component/calendar/calendar";

export default function Home() {
  return (
    <main className={styles.main}>
    <Calendar />
    </main>
  )
}
