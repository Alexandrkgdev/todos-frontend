import styles from '@/styles/Register.module.css'
import {useForm} from "react-hook-form";
import useSWR from 'swr'
import {BASE_AUTH_URL, fetcher} from "@/api";
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

export default function Login() {
  // const {data, error, isLoading} = useSWR(BASE_AUTH_URL, fetcher);
  // const { trigger } = useSWRMutation('/api/user', updateUser)
  const {trigger} = useSWRMutation(BASE_AUTH_URL + '/login', saveUser)

  const {register, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    trigger(data)
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.title}>
          Login
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.inputGroup}>
            <div>Name</div>

            <input defaultValue="test" {...register("username")} className={styles.input}/>
          </div>

          <div className={styles.inputGroup}>
            <div>Password</div>

            <input type="password" {...register("password", {required: true})} className={styles.input}/>

            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <input type="submit" className={styles.button}/>
        </form>
      </div>
    </main>
  )
}
