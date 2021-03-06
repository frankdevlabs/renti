import S from "@sanity/desk-tool/structure-builder";
import { MdSettings, MdPerson, MdFormatQuote, MdFolder } from "react-icons/md";

export const getDefaultDocumentNode = () => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  return S.document().views([S.view.form()]);
};

/**
 * This defines how documents are grouped and listed out in the Studio.
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Settings")
        .icon(MdSettings)
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.divider(),
      S.listItem()
        .title("Authors")
        .icon(MdPerson)
        .schemaType("author")
        .child(S.documentTypeList("author").title("Authors")),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["review", "author", "siteSettings", "page"].includes(
            listItem.getId()
          )
      ),
      S.listItem()
        .title("Reviews")
        .icon(MdFormatQuote)
        .schemaType("review")
        .child(S.documentTypeList("review").title("review")),
      S.listItem()
        .title("Pages")
        .icon(MdFolder)
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),
    ]);
