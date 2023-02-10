import styles from '@/styles/Register.module.css'
import { useForm } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.title}>
          Register
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.inputGroup}>
            <div>Name</div>

            <input defaultValue="test" {...register("example")} className={styles.input}/>
          </div>

          <div className={styles.inputGroup}>
            <div>Password</div>

            <input type="password" {...register("exampleRequired", { required: true })} className={styles.input}/>

            {errors.exampleRequired && <span>This field is required</span>}

          </div>

          <input type="submit"  className={styles.button}/>
        </form>
      </div>
    </main>
  )
}
