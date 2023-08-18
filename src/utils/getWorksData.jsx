import { client } from "libs/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export async function getWorksData(
  page = 1,
  categorySlug = "",
  tagSlug = "",
  dateFilter = "",
  limit = 5
) {
  const offset = (page - 1) * limit;

  let queries = { skip: offset, limit };
  if (categorySlug) {
    queries["fields.category.sys.id"] = categorySlug;
  }

  if (tagSlug) {
    queries["fields.tag.sys.id"] = tagSlug;
  }

  const worksData = await client.getEntries({
    content_type: "works",
    ...queries,
  });

  const categoriesData = await client.getEntries({
    content_type: "categories",
  });
  const tagsData = await client.getEntries({
    content_type: "tags",
  });

  const categories = {};
  categoriesData.items.forEach((category) => {
    categories[category.sys.id] = category.fields;
  });

  const tags = {};
  tagsData.items.forEach((tag) => {
    tags[tag.sys.id] = tag.fields;
  });

  const works = worksData.items.map((work) => {
    const category =
      work.fields.category && categories[work.fields.category.sys.id];
    const workTags = Array.isArray(work.fields.tag)
      ? work.fields.tag.map((tag) => tags[tag.sys.id]?.tag || null)
      : [];
    return { ...work.fields, category: category || null, tags: workTags };
  });

  return {
    works,
    category: categoriesData.items,
    tag: tagsData.items,
    totalCount: worksData.total,
  };
}

export async function getUniqueDates() {
  const allWorksData = [];
  let page = 1;

  while (true) {
    const { works } = await getWorksData(page);
    if (works.length === 0) {
      break;
    }
    allWorksData.push(...works);
    page++;
  }

  const uniqueDates = [];

  if (allWorksData && allWorksData.length > 0) {
    const allDates = allWorksData.map((work) =>
      dayjs.utc(work.publishedAt).tz("Asia/Tokyo").format("YYYY年M月")
    );
    const groupedDates = [...new Set(allDates)];
    uniqueDates.push(...groupedDates);
  }
  return uniqueDates;
}
