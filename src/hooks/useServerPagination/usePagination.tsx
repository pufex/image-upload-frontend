import { useCallback } from "react"
import { useSearchParams } from "react-router"
import IconButton from "../../components/IconButton"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"
import pagination from "./pagination"

export const useServerPagination = (pagesCount: number,itemsPerPage: number) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchParamsPage = searchParams.get("page")
    const page = !searchParamsPage || isNaN(Number(searchParamsPage))
        ? 1
        : Number(searchParamsPage)

    const previousPage = useCallback(() => {
        setSearchParams((prev) => {
            const page = Number(prev.get("page"))
            if (page > 1) {
                prev.set("page", (page - 1).toString())
            }
            return prev
        })
    }, [page, itemsPerPage])

    const nextPage = useCallback(() => {
        setSearchParams((prev) => {
            const pageInParams = prev.get("page")
            const page = !pageInParams || isNaN(Number(pageInParams))
                ? 1
                : Number(pageInParams)
            if (page < pagesCount) {
                prev.set("page", (page + 1).toString())
            }

            return prev
        })
    }, [pagesCount, page, itemsPerPage])

    const setPage = useCallback((newPage: number) => {
        setSearchParams((prev) => {
            if (newPage >= 1 && newPage <= pagesCount) {
                prev.set("page", newPage.toString())
            }
            return prev
        })
    }, [pagesCount, page, itemsPerPage])

    return {
        previousButton: page > 1
            ? <IconButton
                type="button"
                onClick={previousPage}
            >
                <ArrowBigLeft className="w-5 h-5 text-white" />
            </IconButton>
            : null,
        nextButton: page < pagesCount
            ? <IconButton
                type="button"
                onClick={nextPage}
            >
                <ArrowBigRight className="w-5 h-5 text-white" />
            </IconButton>
            : null,
        pagination: pagination(page, pagesCount, 5)
            .map((page) => <IconButton
                type="button"
                onClick={() => setPage(page)}
            >
                {page}
            </IconButton>)
    }

}