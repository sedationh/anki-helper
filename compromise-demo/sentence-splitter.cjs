const nlp = require('compromise')

// 示例文本
const text = `Kind of? create-t3-app is a CLI built by seasoned T3 Stack devs to streamline the setup of a modular T3 Stack app. This means each piece is optional, and the “template” is generated based on your specific needs.

After countless projects and many years on this tech, we have lots of opinions and insights. We’ve done our best to encode them into this CLI.

This is NOT an all-inclusive template. We expect you to bring your own libraries that solve the needs of YOUR application. While we don’t want to prescribe solutions to more specific problems like state management and deployment, we do have some recommendations listed here.

T3 Axioms
We’ll be frank - this is an opinionated project. We share a handful of core beliefs around building and we treat them as the basis for our decisions.

Solve Problems
It’s easy to fall into the trap of “adding everything” - we explicitly don’t want to do that. Everything added to create-t3-app should solve a specific problem that exists within the core technologies included. This means we won’t add things like state libraries (zustand, redux) but we will add things like NextAuth.js and integrate Prisma and tRPC for you.

Bleed Responsibly
We love our bleeding edge tech. The amount of speed and, honestly, fun that comes out of new shit is really cool. We think it’s important to bleed responsibly, using riskier tech in the less risky parts. This means we wouldn’t ⛔️ bet on risky new database tech (SQL is great!). But we happily ✅ bet on tRPC since it’s just functions that are trivial to move off.

Typesafety Isn’t Optional
The stated goal of Create T3 App is to provide the quickest way to start a new full-stack, typesafe web application. We take typesafety seriously in these parts as it improves our productivity and helps us ship fewer bugs. Any decision that compromises the typesafe nature of Create T3 App is a decision that should be made in a different project.`

// 使用 compromise 处理文本
const doc = nlp(text)

// 获取所有句子
const sentences = doc.sentences().out('array')

// 打印每个句子
console.log('分句结果：')
sentences.forEach((sentence, index) => {
  console.log(`${index + 1}: ${sentence.trim()}`)
})

// // 如果你想要更多信息，可以使用 json() 方法
// const detailedSentences = doc.sentences().json()
// console.log('\n详细信息：')
// console.log(detailedSentences)

// // 你也可以对句子进行过滤或其他操作
// const questionsOnly = doc.sentences().filter(s => s.has('?')).out('array')
// console.log('\n只包含问号的句子：')
// console.log(questionsOnly) 