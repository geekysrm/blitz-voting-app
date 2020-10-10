import { Ctx } from "blitz"
import db, { QuestionDeleteArgs } from "db"

type DeleteQuestionInput = Pick<QuestionDeleteArgs, "where">

export default async function deleteQuestion({ where }: DeleteQuestionInput, ctx: Ctx) {
  // TODO: remove once Prisma supports cascading deletes
  await db.choice.deleteMany({ where: { question: { id: where.id } } })
  ctx.session.authorize()

  const question = await db.question.delete({ where })

  return question
}
