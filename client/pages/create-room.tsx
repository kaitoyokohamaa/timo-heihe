import React from "react";
import { SkillModel, useCreateRoomPageQuery } from "../generated/types";
import {
  ACSelectedData,
  AutoComplate,
} from "../components/auto-complate/auto-complate";
import { Card } from "../components/card/card";
import { useCreateRoom } from "../hooks/useCreateRoom";
import { Heading } from "../components/heading/heading";
import { Avatar } from "../components/avatar/avatar";
import { FileInput } from "../components/file-input/file-inpute";
import { TextInput } from "../components/text-input/text-input";
import { Radio } from "../components/radio/radio";
import { Checkbox } from "../components/checkbox/checkbox";
import { LanguagePochiSet } from "../components/language/language-pochi-set";
import { Button } from "../components/button";
import GithubIcon from "../assets/icons/github.svg";
import { TextArea } from "../components/text-area";
import { useAuthGuard } from "../hooks/useAuthGurad";
import { Template } from "../components/template/app/template";
import { OperationTag } from "../components/tag/operation";
const betweenH2 = "space-y-2";

export default function CreateRoom() {
  const {
    setTitle,
    setRespositoryUrl,
    setSkills,
    setDescription,
    setSlug,
    onClickFileInput,
    onChangeFileInput,
    onSubmit,
    setIsRequired,
    searchConditions,
    onChangeCategories,
    setName,
    selectedSkills,
    fileRef,
    imageUrl,
    setLevelIds,
    levelIds,
  } = useCreateRoom();
  const { data } = useCreateRoomPageQuery();

  useAuthGuard({});

  const skills = data?.skills || [];
  console.log("selectedSkills", selectedSkills);

  return (
    <Template className="p-10 px-28 grid grid-cols-8 gap-8">
      <div className="col-span-5">
        {/*左側のカード */}
        <Card className="p-8">
          <form onSubmit={onSubmit}>
            <div className="space-y-10">
              <Heading as="h1Small">新しいルームを作成する</Heading>
              <div className={betweenH2}>
                <Heading as="h2">ルームアイコン</Heading>
                <div className="flex items-center space-x-7">
                  <Avatar src={imageUrl} />
                  <FileInput
                    ref={fileRef}
                    onClick={onClickFileInput}
                    onChange={onChangeFileInput}
                  />
                </div>
              </div>

              <div className="flex">
                <div className={`w-1/4 ${betweenH2}`}>
                  <span className="flex">
                    <Heading as="h2">ルームID</Heading>
                    <span className="text-red-500">*</span>
                  </span>

                  <TextInput
                    placeholder="ルームID"
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>

                <div className={`w-full ml-8 ${betweenH2}`}>
                  <span className="flex">
                    <Heading as="h2">ルーム名</Heading>
                    <span className="text-red-500">*</span>
                  </span>

                  <TextInput
                    placeholder="ルーム名を入力"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className={`w-full mt-10 ${betweenH2}`}>
                <span className="flex">
                  <Heading as="h2">募集タイトル</Heading>
                  <span className="text-red-500">*</span>
                </span>

                <TextInput
                  placeholder="メンバー募集タイトル"
                  className="w-2/3"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className={`flex flex-col flex-wrap w-2/3`}>
                <Heading as="h2">カテゴリー</Heading>

                <div>
                  {data?.categories.map((category, i) => (
                    <Checkbox
                      key={i}
                      className="mt-4 mr-4"
                      value={category.id?.toString()}
                      onChange={(e) =>
                        onChangeCategories(e, Number(e.currentTarget.value))
                      }
                    >
                      {category.name}
                    </Checkbox>
                  ))}
                </div>
              </div>
              <div className={betweenH2}>
                <span className="flex">
                  <Heading as="h2">ルームについて</Heading>
                  <span className="text-red-500">*</span>
                </span>

                <div className="w-2/3 h-52">
                  <TextArea
                    placeholder="ルームについて（Markdown記法）&#13;&#10;最初の一文がルーム一覧の説明文に表示されます。"
                    className="w-2/3"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit">作成する</Button>
            </div>
          </form>
        </Card>
      </div>

      {/* 右側のカード */}
      <div className="col-span-3">
        <Card className="p-8">
          <Heading as="h1Small">ルームへの申請</Heading>
          <div className="flex space-x-8">
            <Radio
              text="なし"
              name="apply"
              value="1"
              onChange={(e) => setIsRequired(e.target.value)}
            />
            <Radio
              text="あり"
              name="apply"
              value="2"
              onChange={(e) => setIsRequired(e.target.value)}
            />
          </div>
          <div className={`${betweenH2} mt-10`}>
            <Heading as="h2">招待URL</Heading>

            <div className="flex items-center space-x-2">
              <TextInput
                placeholder="DiscordやSlackの招待URL"
                onChange={(e) => setRespositoryUrl(e.target.value)}
              />
            </div>
          </div>
          <div className={`${betweenH2} mt-10`}>
            <Heading as="h2">Githubリポジトリ</Heading>

            <div className="flex items-center space-x-2">
              <GithubIcon height="30px" />
              <TextInput
                placeholder="URLを入力"
                onChange={(e) => setRespositoryUrl(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/*  募集するレベル帯 */}
        <Card className="p-8 mt-10">
          <Heading as="h2" className="pt-6 pb-4">
            募集レベル
          </Heading>
          <div>
            {searchConditions?.recruitmentLevels.map((level) => (
              <OperationTag
                id={level.id}
                name={level.name}
                selectedItemIds={levelIds}
                isSelected={levelIds.includes(level.id)}
                key={level.id}
                setIsSelected={setLevelIds}
              />
            ))}
          </div>
          <div className={`${betweenH2} mt-10`}>
            <Heading as="h2">募集する役割</Heading>

            <div className="flex items-center space-x-2">
              <TextInput
                placeholder="フロントエンドエンジニア "
                onChange={(e) => setRespositoryUrl(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/*  使用するスキル */}
        <Card className="p-8 mt-10">
          <div className={betweenH2}>
            <Heading as="h2">使用するスキル</Heading>

            <AutoComplate
              data={convertToACData(skills)}
              placeholder="スキルを検索"
              setSelected={setSkills}
              selectedData={selectedSkills}
            />
            <div>
              <LanguagePochiSet
                languages={convertToSkillPochiSetArray(selectedSkills)}
              />
            </div>
          </div>
        </Card>
      </div>
    </Template>
  );
}

export const convertToACData = (skills: Pick<SkillModel, "id" | "name">[]) => {
  return skills.map((skill) => ({
    id: skill.id.toString(),
    name: skill.name,
  }));
};

export const convertToSkillPochiSetArray = (skills: ACSelectedData[]) => {
  return skills.map((skill) => skill.name);
};

// // const categoriesMock = [
// //   "iOS",
// //   "Android",
// //   "Web",
// //   "ゲーム",
// //   "iOS",
// //   "Android",
// //   "Web",
// //   "ゲーム",
// //   "iOS",
// //   "Android",
// //   "Web",
// //   "ゲーム",
// // ];
