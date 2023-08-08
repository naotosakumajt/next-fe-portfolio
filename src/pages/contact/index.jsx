import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout/Layout";
import styles from "@/styles/Contact.module.scss";

export default function ContactForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/send-slack-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `新しいお問い合わせが送信されました！\n\n名前: ${data.name}\nメールアドレス: ${data.email}\nお問い合わせ内容: ${data.message}`,
        }),
      });

      if (response.ok) {
        // 通知が成功した場合の処理
        toast.success("送信しました", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        // 通知が失敗した場合の処理
        toast.error("送信に失敗しました", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      // エラーハンドリング
      console.error("errorlog");
    }
  };

  return (
    <Layout>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>CONTACT</h2>
        <div className={styles.formInner}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formItem}>
              <label htmlFor="name" className={styles.label}>
                名前：
              </label>
              <input
                className={styles.input}
                {...register("name", { required: "名前を入力してください" })}
              />
              {errors.name && (
                <p className={styles.errorMessage}>{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className={styles.label}>
                メールアドレス：
              </label>
              <input
                className={styles.input}
                {...register("email", {
                  required: "メールアドレスを入力してください",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                    message: "有効なメールアドレスを入力してください",
                  },
                })}
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className={styles.label}>
                お問い合わせ内容：
              </label>
              <textarea
                className={styles.textarea}
                {...register("message", {
                  required: "お問い合わせ内容を入力してください",
                })}
              />
              {errors.message && (
                <p className={styles.errorMessage}>{errors.message.message}</p>
              )}
            </div>
            <button className={styles.btn} type="submit">
              送信
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
