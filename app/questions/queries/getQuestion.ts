import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstQuestionArgs } from "db"

type GetQuestionInput = Pick<FindFirstQuestionArgs, "where">

export default async function getQuestion(
  { where /* include */ }: GetQuestionInput,
  ctx: Record<any, any> = {}
) {
  const question = await db.question.findOne({ where, include: { choices: true } })
  return question
}
