import { Ctx } from "blitz"
import db, { FindManyQuestionArgs } from "db"

type GetQuestionsInput = Pick<FindManyQuestionArgs, "where" | "orderBy" | "skip" | "take">

export default async function getQuestions(
  { where, orderBy, cursor, take, skip }: GetQuestionsInput,
  ctx: Record<any, any> = {}
) {
  const questions = await db.question.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
    include: { choices: true },
  })
  console.log("exec")
  console.log({ questions })
  return questions
}
