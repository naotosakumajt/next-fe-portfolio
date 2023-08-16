import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/router";
import styles from "@/components/WorksList/WorksList.module.scss";

export const ArchiveSelect = ({ uniqueDates }) => {
  const router = useRouter();

  return (
    <div className={styles.selectWrapper}>
      <select
        name=""
        id="monthly-archive"
        onChange={(e) => {
          const selectedDate = e.target.value;
          if (selectedDate) {
            const year = selectedDate.split("年")[0];
            const month = selectedDate
              .split("年")[1]
              .replace("月", "")
              .padStart(2, "0");
            const formattedDate = `${year}_${month}`;
            router.push(`/works/archive/${formattedDate}`);
          }
        }}
      >
        <option value="">年月から絞り込む</option>
        {uniqueDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <div className={styles.selectIcon}>
        <FaChevronDown />
      </div>
    </div>
  );
};
