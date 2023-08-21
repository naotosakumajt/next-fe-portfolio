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
  limit = null
) {
  const offset = (page - 1) * (limit !== null ? limit : 5);
  let queries = { skip: offset };
  if (limit !== null) {
    queries["limit"] = limit;
  }

  if (categorySlug) {
    queries["fields.category.sys.id"] = categorySlug;
  }

  if (tagSlug) {
    queries["fields.tag.sys.id"] = tagSlug;
  }

  const worksData = await client.getEntries({
    content_type: "works",
    order: "-fields.publishedAt",
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
    return {
      id: work.sys.id,
      ...work.fields,
      category: category || null,
      tags: workTags,
    };
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
