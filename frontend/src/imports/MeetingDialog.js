
import { useDispatch, useSelector } from "react-redux"
import { setOnOff } from "@/store/slices/agent" 
import { useEffect, useState } from "react"
import { URL } from "@/CONST"
import { GenerateAvatar } from "@/Avatar/Avatar"



import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"



export  {useDispatch, useSelector,setOnOff,useEffect, useState,URL,GenerateAvatar,Input,Label, Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button
}