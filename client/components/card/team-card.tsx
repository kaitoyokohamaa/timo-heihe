import React from "react";
import { Card } from "./card";
import { SkillPochiSet } from "../skill/skill-pochi-set";
import {
  AvatarWithName,
  AvatarWithNameProps,
} from "../avatar/avatar-with-name";
import { SkillModel, RoomCardFragment } from "../../generated/types";
import { dateFormatter, YEAR_MANTH_DAY_SLASH } from "../../utils/dateFormat";
import Link from "next/link";
import { FirstParagraphDisplayer } from "../parser/first-paragraph-displayer";

export type TeamCardProps = {
  id: number;
  title: string;
  slug: string;
  owner: AvatarWithNameProps;
  description: string;
  languages: string[];
  createdAt: string;
  className?: string;
};

export const convertToTeamCardObjFromTeams = (
  queryObj: RoomCardFragment[]
): TeamCardProps[] => {
  return queryObj.map((team) => {
    return {
      ...team,
      id: team.id || 0,
      owner: {
        name: team.owner.name,
        src: team.owner.avatar || "",
        userId: team.owner.userId,
      },
      languages: convertToSKillsArray(team.skills),
      createdAt: dateFormatter(
        new Date(Date.parse(team.createdAt)),
        YEAR_MANTH_DAY_SLASH
      ),
    };
  });
};

const convertToSKillsArray = (
  skills: Pick<SkillModel, "name" | "id">[] | null | undefined
) => {
  if (skills == undefined || skills == null) return [""];
  return skills?.map((skill) => skill.name);
};

export const TeamCard: React.FC<TeamCardProps> = ({
  id,
  title,
  slug,
  owner,
  description,
  languages,
  createdAt,
  className,
}: TeamCardProps) => {
  return (
    <div>
      <Link href="/room/[slug]" as={`/room/${slug}`}>
        <div>
          <Card
            variant="none"
            className={`p-5 cursor-pointer ${className}`}
            tabIndex={0}
            role="button"
          >
            <div className="flex items-center">
              <h3 className="flex-1">{title}</h3>

              <span>
                <AvatarWithName
                  src={owner.src}
                  name={owner.name}
                  size="small"
                  className="mr-4"
                  userId={owner.userId}
                />
              </span>
            </div>

            <FirstParagraphDisplayer className="pt-4 pb-6" text={description} />

            <div className="flex items-end">
              <SkillPochiSet skills={languages} className="flex-1" />

              <span className="space-x-2">
                <span>作成日</span>
                <span>{createdAt}</span>
              </span>
            </div>
          </Card>
        </div>
      </Link>
    </div>
  );
};

// export const mockTeams: TeamCardProps[] = [
//   {
//     id: 1,
//     title: "Web開発",
//     owner: {
//       name: "Ropital",
//       src: "https://bit.ly/ryan-florence",
//       userId: "1",
//     },
//     description:
//       "チーム募集Webアプリを開発しています。PrismaやTypeScript, GraphQL,Goなどを使用 しています！モダン技術が好きな方是非きてください！",
//     languages: ["go", "typescript", "go", "typescript", "go", "typescript"],
//     createdAt: "2020/9/12",
//     member: {
//       current: 22,
//       limit: 50,
//     },
//   },
//   {
//     id: 2,
//     title: "Web開発",
//     owner: {
//       name: "Ropital",
//       src: "https://bit.ly/ryan-florence",
//       userId: "2",
//     },
//     description:
//       "チーム募集Webアプリを開発しています。PrismaやTypeScript, GraphQL,Goなどを使用 しています！モダン技術が好きな方是非きてください！",
//     languages: ["go", "typescript", "go", "typescript", "go", "typescript"],
//     createdAt: "2020/9/12",
//     member: {
//       current: 22,
//       limit: 50,
//     },
//   },
//   {
//     id: 3,
//     title: "Web開発",
//     owner: {
//       name: "Ropital",
//       src: "https://bit.ly/ryan-florence",
//       userId: "3",
//     },
//     description:
//       "チーム募集Webアプリを開発しています。PrismaやTypeScript, GraphQL,Goなどを使用 しています！モダン技術が好きな方是非きてください！",
//     languages: ["go", "typescript", "go", "typescript", "go", "typescript"],
//     createdAt: "2020/9/12",
//     member: {
//       current: 22,
//       limit: 50,
//     },
//   },
// ];
