'use client'
import { api } from "@/utils/api";
import { type Stream } from "@prisma/client";
import React, { useState } from "react";
import { Button, StatusMsg } from "~/components";

// eslint-disable-next-line no-unused-vars

function AddStream() {
  const [stream, setStream] = useState<Stream | undefined>();
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    setStream((prevStream: Stream | undefined) => {
      if (!prevStream) {
        return { [name]: value } as Stream; // or some default value if you have one
      }

      const updatedStream = {
        ...prevStream,
        [name]: value,
      };

      return updatedStream;
    });
  };

  const addStreamMutation = api.stream.addStream.useMutation();

  const handleSubmit = () => {
    setSubmit(true);
    try {
      addStreamMutation.mutate(stream as Stream, {
        onSuccess: (res) => {
          setSubmit(false);
          setStatus({
            type: "success",
            message: `succesfully added ${stream?.name ?? ""} as  stream`,
          });
          setTimeout(() => {
            res && window.location.reload();
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
      <div className="p-2 md:p-4 text-2xl font-semibold">
        <h3>Add Streams</h3>
      </div>
      <div>
        <div>
          <div className="m-4 bg-[#F7F6FB] rounded-xl p-4 md:p-6">
            <div className="card-body">
              <form>
                <div className="col-12">
                  <h5 className="text-xl pb-4">
                    Stream Information{" "}
                    <span>
                      <a href="javascript">
                        <i className="feather-more-vertical"></i>
                      </a>
                    </span>
                  </h5>
                </div>
                <div>
                  <div className="flex pb-4 flex-col md:grid grid-cols-3 gap-2 gap-y-4 md:gap-y-8">
                    <div>
                      <label>
                        Stream Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={stream?.name}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter unique Stream ID"
                        name="slug"
                      />
                    </div>
                  </div>
                  <div>
                    {submit ? (
                      <Button />
                    ) : (
                      <button
                        onClick={() => handleSubmit()}
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
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
