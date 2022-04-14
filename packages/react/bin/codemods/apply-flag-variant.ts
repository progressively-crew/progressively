import { API, FileInfo } from "jscodeshift";
import prettier from "prettier";
const featureKey = "a";

function transform(fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Remove the useFlags assignments
  root
    .find(j.CallExpression, { callee: { name: "useFlags" } })
    .forEach((nodePath) => nodePath.parentPath.prune());

  // Remove the if(flags.a) syntax
  root
    .find(j.IfStatement, {
      test: {
        object: {
          name: "flags",
        },
        property: {
          name: featureKey,
        },
      },
    })
    .forEach((nodePath) => {
      j(nodePath).replaceWith((nodePath.value.consequent as any).body);
    });

  // Remove the if(!flags.a) syntax
  root
    .find(j.UnaryExpression, {
      argument: {
        object: {
          name: "flags",
        },
        property: {
          name: featureKey,
        },
      },
    })
    .forEach((nodePath) => {
      if (
        nodePath.value.operator === "!" &&
        nodePath.parent.value.alternate?.body
      ) {
        j(nodePath.parent).replaceWith(nodePath.parent.value.alternate.body);
      }
    });

  const rawString = root.toSource();
  return prettier.format(rawString, { parser: "babel" });
}

module.exports = transform;
