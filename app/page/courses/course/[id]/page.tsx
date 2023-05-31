
"use client";
import { api } from "@/utils/api";

function CoursePage({ params: { id } }: { params: { id: string } }) {

    const { data, isLoading, error } = api.course?.getById.useQuery(
      id || "621dd16f2eece6ce9587cb0d"
    );

    console.log("task pars", id);
    console.log("course", data);

    if (error) {
      console.log(error);
    }
  return <div>CoursePage</div>;
}

export default CoursePage