import { Spinner } from "./Spinner";

export const LoadingPage = () => {

  return (
    <div className=" text-4xl text-bold flex justify-center items-center">
      <Spinner size="lg"/>
    </div>
  )
};