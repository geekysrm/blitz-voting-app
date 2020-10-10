import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getQuestion from "app/questions/queries/getQuestion"
import updateQuestion from "app/questions/mutations/updateQuestion"
import QuestionForm from "app/questions/components/QuestionForm"

export const EditQuestion = () => {
  const router = useRouter()
  const questionId = useParam("questionId", "number")
  const [question, { mutate }] = useQuery(getQuestion, { where: { id: questionId } })
  const [updateQuestionMutation] = useMutation(updateQuestion)

  return (
    <div>
      <h1>Edit Question {question.id}</h1>
      <pre>{JSON.stringify(question)}</pre>

      <QuestionForm
        initialValues={question}
        onSubmit={async () => {
          try {
            const updated = await updateQuestion({
              where: { id: question.id },
              data: { text: "Do you really love Blitz?" },
            })
            await mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/questions/[questionId]", `/questions/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating question " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditQuestionPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditQuestion />
      </Suspense>

      <p>
        <Link href="/questions">
          <a>Questions</a>
        </Link>
      </p>
    </div>
  )
}

EditQuestionPage.getLayout = (page) => <Layout title={"Edit Question"}>{page}</Layout>

export default EditQuestionPage
