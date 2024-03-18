"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hook";
import { setMenus } from "@/store/slice/menuSlice";
import { setMenuCategories } from "@/store/slice/menuCategorySlice";

const page = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  console.log("session", session);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/backoffice/app");
    const data = await res.json();
    const { menus, menuCategories } = data;

    dispatch(setMenus(data.menus));
    dispatch(setMenuCategories(data.menuCategories));
  };
  return <div>This is backoffice page</div>;
};

export default page;
