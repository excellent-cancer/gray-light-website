import DocumentLayoutPage from "@/components/BaseLayout";
import CatalogsViewPage from "@/modules/docs/pages/CatalogsViewPage";
import HeadlineViewPage from "@/modules/docs/pages/HeadlineViewPage";
import ChapterContentPage from "@/modules/docs/pages/ChapterContentPage";

import DocumentStatus from "@/modules/docs/shared/document-status";

export default {
  path: '/docs',
  component: DocumentLayoutPage,
  children: [
    {
      path: ':id',
      components: {
        left: CatalogsViewPage,
        right: HeadlineViewPage,
        default: ChapterContentPage
      },
      props: true,
      beforeEnter(to, from, next) {
        DocumentStatus.create(to.params.id)
          .then(
            status => {
              to.params.documentStatus = status
              next()
            }
          )
          .catch(
            error =>
              next(Error(error))
          )
      }
    }
  ]
}