import styles from '@/styles/Todos.module.css'
import {useForm} from "react-hook-form";
import useSWR from 'swr'
import {BASE_AUTH_URL, BASE_TODOS_URL, fetcher} from "@/api";
import useSWRMutation from 'swr/mutation'

// @ts-ignore
async function updateUser(url, {arg}) {
  await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${arg}`
      }
    }
  )
}

// @ts-ignore
async function saveUser(url, {arg}) {
  await fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg),
      headers: {
        'content-type': `application/json`
      }
    }
  )
}

export default function Todos() {
  const {data, error, isLoading} = useSWR(BASE_TODOS_URL, fetcher);
  // const { trigger } = useSWRMutation('/api/user', updateUser)
  const {trigger} = useSWRMutation(BASE_AUTH_URL + '/api/auth/register', saveUser)
  // const res = await fetch(BASE_TODOS_URL + '/todos')

  const {register, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    trigger(data)
  }

  return (
    <main className={styles.main}>
      <h1>
        Todos
      </h1>

      <div className={styles.todoList}>
        {[1,2,3].map((item) => {

          return (
            <div className={styles.todo} key={item}>
              <div>{item}</div>
              <div>name</div>
              <div>description</div>
              <div>status</div>
              <div>due date</div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(BASE_TODOS_URL + '/todos')
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}