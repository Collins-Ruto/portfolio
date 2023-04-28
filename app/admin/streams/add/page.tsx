"use client";
import { api } from "@/utils/api";
import { type Stream } from "@prisma/client";
import React, { useState } from "react";
import { Button, StatusMsg } from "~/components";

// eslint-disable-next-line no-unused-vars

interface IndexedInput extends Stream {
  [key: string]: string | boolean;
}

function AddStream() {
  const [stream, setStream] = useState<Stream | undefined>();
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [validInput, setValidInput] = useState("");

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    setStream((prevStream: Stream | undefined) => {
      if (!prevStream) {
        return { [name]: value } as unknown as Stream; // or some default value if you have one
      }

      const updatedStream = {
        ...prevStream,
        [name]: value,
      };

      return updatedStream;
    });
  };

  const inputValidate = (action: string) => {
    const fields = ["name", "slug"];
    const input = stream as IndexedInput;
    let message = "Please fill: ";
    if (action === "clear") {
      setStream(() => {
        let newInput = {} as unknown as Stream;
        fields.forEach((field) => {
          newInput = { ...newInput, [field]: "" };
        });
        return newInput;
      });
    }
    fields.forEach((field) => {
      if (input?.[field] === "" || input?.[field] === undefined) {
        message += `${field}, `;
        setValidInput(message);
      }
    });
    if (message === "Please fill: ") {
      return true;
    } else {
      return false;
    }
  };

  const addStreamMutation = api.stream.addStream.useMutation();

  const handleSubmit = () => {
    if (inputValidate("") === false) {
      return;
    }
    setSubmit(true);
    try {
      addStreamMutation.mutate(stream as Stream, {
        onSuccess: () => {
          setSubmit(false);
          setStatus({
            type: "success",
            message: `succesfully added ${stream?.name ?? ""} as  stream`,
          });
          setTimeout(() => {
            inputValidate("clear");
          }, 2000);
        },
      });
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" });
    }
  };

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-2 text-2xl font-semibold md:p-4">
        <h3>Add Streams</h3>
      </div>
      <div>
        <div>
          <div className="m-4 rounded-xl bg-[#F7F6FB] p-4 md:p-6">
            <div className="card-body">
              <form>
                <div className="col-12">
                  <h5 className="pb-4 text-xl">
                    Stream Information{" "}
                    <span>
                      <a href="javascript">
                        <i className="feather-more-vertical"></i>
                      </a>
                    </span>
                  </h5>
                </div>
                <div>
                  <div className="flex grid-cols-3 flex-col gap-2 gap-y-4 pb-4 md:grid md:gap-y-8">
                    <div>
                      <label>
                        Stream Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={stream?.name}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="Enter Stream Name"
                        name="name"
                      />
                    </div>
                    <div>
                      <label>Stream ID </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={stream?.slug}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="Enter unique Stream ID"
                        name="slug"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="opacity80 rounded text-sm text-red-500">
                      <span className="">{validInput}</span>
                      <span className="text-transparent">.</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    {submit ? (
                      <Button />
                    ) : (
                      <button
                        onClick={() => handleSubmit()}
                        type="submit"
                        className="rounded bg-blue-500 px-10 py-2 font-bold text-white hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStream;
