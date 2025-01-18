import Mustache from "mustache";

export const renderTemplate = (
  template: string,
  data: Record<string, string>
) => {
  return Mustache.render(template, data);
};
