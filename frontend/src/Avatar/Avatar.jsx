import { createAvatar } from '@dicebear/core';
import { botttsNeutral,adventurer, initials } from '@dicebear/collection';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export const GenerateAvatar=({seed,className,variant})=>{
    let avatar;

    if(variant==="botttsNeutral"){
      avatar=createAvatar(botttsNeutral,{seed});
    }
   else if(variant==="adventurer"){
      avatar=createAvatar(adventurer,{seed});
    }
    else{
        avatar=createAvatar(initials,{seed,fontWeight:500,fontSize:42})
    }

    return <>
    <Avatar className={className} >
                <AvatarImage src ={avatar.toDataUri()}  />
                {/* <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback> */}
        </Avatar>
    </>
}

export const GenerateImage=(seed,variant)=>{
   let avatar;

    if(variant==="botttsNeutral"){
      avatar=createAvatar(botttsNeutral,{seed});
    }
   else if(variant==="adventurer"){
      avatar=createAvatar(adventurer,{seed});
    }
   
    return avatar.toDataUri();


}