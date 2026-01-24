import { Button } from '@/components/ui/button'
const Paging = ({page,setPage,totalPage}) => {

    const canPre=page>1;
    const canNext=page<totalPage;
    
  return (
    <div className='flex justify-between mt-4'>
        <div>
            Page {page} of {totalPage}
        </div>
        <div className='mr-6 flex gap-3'>
            <Button  disabled={!canPre}  onClick={()=>setPage(page-1)}>Previous</Button>
            <Button  disabled={!canNext} onClick={()=>setPage(page+1)}>Next</Button>
        </div>
    </div>
  )
}

export default Paging