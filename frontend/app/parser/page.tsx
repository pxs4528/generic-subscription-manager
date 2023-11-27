'use client'
import { CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FormEventHandler, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useRef, useState } from "react";
import { lusitana } from "../ui/fonts";
export default function Home() {
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState<Record<string, { formattedDate: string; price: number }> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setSubscriptions(data);
        } else {
          console.error('Error uploading file:', response.statusText);
        }
      } catch (error: any) {
        console.error('Error uploading file:', error.message);
      }
    }
  };
  return subscriptions ?
  <>
  <div>
    <h1 className={`${lusitana.className} text-xl text-center m-3 text-gray-800 md:text-3xl md:leading-normal`}>
      Parsed Subscriptions
    </h1>
  </div>
  <form>
  <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
      <div className="rounded-lg bg-gray-50 p-2 md:py-0">

        {Object.entries(subscriptions).map(([key, value]) => (
          <div key={key} className="border-b border-gray-200 p-2 sm:p-4">
            {/* Choose Subscription */}
            <div className="mb-4">
              <label htmlFor={`subscription-${key}`} className="mb-2 block text-sm font-medium">
                Choose Subscription
              </label>
              <input
                id={`subscription-${key}`}
                name={`subscription-${key}`}
                className="w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={key}
              />
            </div>

            {/* Choose Date */}
            <div className="mb-4">
              <label htmlFor={`date-${key}`} className="mb-2 block text-sm font-medium">
                Choose Date
              </label>
              <input
                id={`date-${key}`}
                name={`date-${key}`}
                type="date"
                className="w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={value.formattedDate}
              />
            </div>

            {/* Choose Amount */}
            <div className="mb-4">
              <label htmlFor={`amount-${key}`} className="mb-2 block text-sm font-medium">
                Choose an amount
              </label>
              <input
                id={`amount-${key}`}
                name={`amount-${key}`}
                type="number"
                defaultValue={value.price}
                placeholder="Enter USD amount"
                className="w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        ))}

        <div className="mb-2 w-full rounded-md bg-white p-4">
          <div className="flex items-center justify-between border-b pb-4">
            {/* Additional content if needed */}
          </div>
        </div>

      </div>
    </div>
  </div>
</form>
</>

    : (
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='w-96'>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF Files only
                  </p>
                </div>
                <form onSubmit={handleFileUpload}
                >
                  <input title="file" type="file" name="file" ref={inputRef} />
                  <button type="submit"
                    className="w-1/2 box-content inline-flex items-center justify-center px-3 py-2 bg-blue-600 border border-transparent transition-transform hover:scale-105 rounded-md font-semibold capitalize text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 cursor-pointer"
                  >
                    Upload
                  </button>            </form>{" "}
              </label>
            </div>
            <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
          </div>      </div>

      </main>
    );
}