import { useForm } from "react-hook-form"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"

type Props = {}

const towers = ["A", "B"]

const Form = (props: Props) => {
  const [floors, setFloors] = useState<Number[]>([])
  const [meetingRooms, setMeetingRooms] = useState<String[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm()
  const onSubmit = (data: any) => {
    const formData = {
      Башня: data.tower,
      Этаж: data.floor,
      Переговорная: data.meetingroom,
      Дата: data.date,
      Начало: data.startTime,
      Конец: data.endTime,
      Комментарий: data.comment,
    }
    if (formData) console.log(formData)
  }

  useEffect(() => {
    if (floors.length === 0) {
      let _floors = []
      for (let i = 3; i <= 27; i++) {
        _floors.push(i)
      }
      setFloors(_floors)
    }
    if (meetingRooms.length === 0) {
      let rooms = []
      for (let i = 1; i <= 10; i++) {
        rooms.push("Переговорная " + i)
      }
      setMeetingRooms(rooms)
    }
  }, [floors.length, meetingRooms.length])

  return (
    <div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2>Бронированние Переговорной</h2>
          </div>
          <div className={styles.formElement}>
            <label htmlFor="towers">Башня:</label>
            <select id="towers" {...register("tower", { required: true })}>
              {towers.map((tower, index) => (
                <option value={tower} key={`${tower}.${index}`}>
                  {tower}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formElement}>
            <label htmlFor="floor">Этаж:</label>
            <select id="floor" {...register("floor", { required: true })}>
              {floors.length > 0 &&
                floors.map((floor, index) => (
                  <option key={`${floor}.${index}`}>{floor.toString()}</option>
                ))}
            </select>
          </div>
          <div className={styles.formElement}>
            <label htmlFor="meeting-room">Переговорная:</label>
            <select
              id="meeting-room"
              {...register("meetingroom", { required: true })}
            >
              {meetingRooms.map((room, index) => (
                <option key={`${room}.${index}`}>{room}</option>
              ))}
            </select>
          </div>
          <div className={styles.formElement}>
            <label htmlFor="date">Дата:</label>
            <input
              id="date"
              type="date"
              {...register("date", { required: true })}
            />
          </div>
          <div className={styles.formElement}>
            <label htmlFor="time">Интервал времени:</label>
            <div className={styles.formTime} id="time">
              <input
                type="time"
                {...register("startTime", { required: true })}
              />
              <input type="time" {...register("endTime", { required: true })} />
            </div>
          </div>
          <div className={styles.formElement}>
            <label htmlFor="comment">Комментарий:</label>
            <textarea
              id="comment"
              {...register("comment", { required: true })}
            ></textarea>
          </div>
          <div className={styles.formButton}>
            <button disabled={!isDirty || !isValid}>Отправить</button>
          </div>
          <div className={styles.clearButton}>
            <a onClick={() => reset()}>Очистить</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
