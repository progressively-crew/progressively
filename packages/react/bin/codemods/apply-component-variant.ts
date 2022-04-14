import { API, FileInfo, ASTPath, JSXIdentifier } from "jscodeshift";
import prettier from "prettier";
const featureKey = "newHomepage";

const hasAttribute = (
  nodePath: ASTPath<JSXIdentifier>,
  attributeName: string,
  attributeValue: string
) =>
  nodePath.parentPath.value.attributes.some(
    (attribute: any) =>
      attribute.name.name === attributeName &&
      attribute.value.value === attributeValue
  );

function transform(fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(fileInfo.source);

  const rawString = root
    .find(j.JSXIdentifier, { name: "FeatureFlag" })
    .filter((path) => j.JSXOpeningElement.check(path.parent.node))
    .forEach((nodePath) => {
      const parentNode = nodePath.parent.parent;

      if (hasAttribute(nodePath, "showWhen", featureKey)) {
        return j(parentNode).replaceWith(parentNode.get("children").value);
      }

      if (hasAttribute(nodePath, "hideWhen", featureKey)) {
        return parentNode.prune();
      }
    })
    .toSource();

  return prettier.format(rawString, { parser: "babel" });
}

module.exports = transform;
