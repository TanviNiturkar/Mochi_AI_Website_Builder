export function lastAssistantTextMessageContent(res: any) {
  if (!res) return undefined;

  if (res.choices?.[0]?.message?.content) {
    return res.choices[0].message.content;
  }

  if (typeof res === "string") return res;

  return undefined;
}
