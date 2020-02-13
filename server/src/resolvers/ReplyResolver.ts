import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Reply } from "../entity/Reply";
import { CreateReplyInput } from "../inputs/CreateReplyInput";
import { User } from "../entity/User";
import { Question } from "../entity/Question";

@Resolver()
export class ReplyResolver {
  @Query(() => [Reply])
  async replies() {
    console.log("replies", await Reply.find({ relations: ["student", "question"] }));

    return Reply.find({ relations: ["student", "question"] });
  }
  @Query(() => Reply)
  async reply(@Arg("id") id: string) {
    console.log("reply:", await Reply.findOne({ where: { id }, relations: ["student", "question"] }));
    return Reply.findOne({ where: { id }, relations: ["student", "question"] });
  }

  @Mutation(() => Reply)
  async createReply(
    @Arg("data") data: CreateReplyInput,
    @Arg("currentUserId") currentUserId: string,
    @Arg("questionId") questionId: string,
  ) {
    console.log("data:", data);

    const reply = Reply.create(data);
    reply.student = await User.findOne({ where: { currentUserId } });
    reply.question = await Question.findOne({ where: { questionId } });

    console.log("reply:", reply);

    await reply.save();

    return reply;
  }
}
