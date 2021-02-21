import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { ACSelectedData } from "../components/auto-complate/auto-complate";
import { CreateTeamInput, useCreateTeamMutation } from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";
import { useFileInput } from "./useFileInput";

export const convertToCategoriesObj = (categories: number[]) => {
  return categories.map((category) => ({
    id: category,
  }));
};

export const convertToSkillsObj = (skills: ACSelectedData[]) => {
  return skills.map((skill) => ({
    id: Number(skill.id),
  }));
};

export const useCreateTeam = () => {
  const router = useRouter();
  const { id } = useAuthContext();
  const [createTeam, { loading }] = useCreateTeamMutation();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recruitNumber, setRecruitNumber] = useState(0);
  const [repositoryUrl, setRespositoryUrl] = useState("");
  const [isRequired, setIsRequired] = useState("1");
  const [selectedSkills, setSkills] = useState<ACSelectedData[]>([]);
  const [categories, setCategories] = useState<number[]>([]);
  const {
    fileRef,
    onClick: onClickFileInput,
    onChange: onChangeFileInput,
    imageUrl,
  } = useFileInput();
  const [types, setTypes] = useState<number[]>([]);

  const getVariables = (): CreateTeamInput => ({
    title,
    name,
    owner: {
      id,
    },
    icon: imageUrl,
    skills: convertToSkillsObj(selectedSkills),
    description,
    members: [
      {
        user: {
          id,
        },
      },
    ],
    repositoryUrl,
    recruitNumbers: recruitNumber,
    isRequired: isRequired === "2",
    categories: convertToCategoriesObj(categories),
    typeIds: types,
  });

  console.log(getVariables());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createTeam({
        variables: {
          input: getVariables(),
        },
      });
      router.push(`/room/${res.data?.createTeam.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeType = (
    event: React.FormEvent<HTMLInputElement>,
    clickedTypeId: number
  ) => {
    const valueExists = types.includes(clickedTypeId);
    if (valueExists) {
      const newTypes = types.filter((type) => type !== clickedTypeId);
      setTypes(newTypes);
    } else {
      setTypes([...types, clickedTypeId]);
    }
  };

  const onChangeCategories = (
    event: React.FormEvent<HTMLInputElement>,
    id: number
  ) => {
    let newCategories = categories.slice();

    if (categories.includes(id)) {
      newCategories = categories.filter((value) => value !== id);
    } else {
      newCategories.push(id);
    }
    setCategories(newCategories);
  };

  return {
    setTitle,
    setSkills,
    setDescription,
    onSubmit,
    onClickFileInput,
    onChangeFileInput,
    setRecruitNumber,
    setRespositoryUrl,
    setIsRequired,
    onChangeCategories,
    onChangeType,
    setName,
    selectedSkills,
    recruitNumber,
    fileRef,
    imageUrl,
    loading,
  };
};
