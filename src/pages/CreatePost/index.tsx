import { useApiFetch, useApiSWR } from "@/hooks/use-api";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";
const CreatePostPage = () => {
  const [isFetching, setIsFetching] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const navigate = useNavigate();
  const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure();

  const removeTag = (tag: string) =>
    setTags((tags) => tags.filter((e) => e != tag));
  const addTag = (tag: string) => setTags((tags) => [...tags, tag]);

  const fetch = useApiFetch();

  const onSubmit = async () => {
    setIsFetching(true);

    const data = await fetch<Post>(`/post`, {
      method: "POST",
      body: {
        title,
        content,
        tags,
      },
    });
    setIsFetching(false);
    navigate(`/post/${data.slug}`);
  };

  return (
    <div className="max-auto">
      <h1 className="text-2xl justify-center text-center">Create new post</h1>

      <div className="mt-3">
        <Input
          type="text"
          label="Title"
          className="max-w-xs mb-2"
          value={title}
          onValueChange={(e) => setTitle(e)}
        />

        <div className="max-w flex mb-2">
          <Textarea
            label="Content"
            placeholder="Enter post content"
            className="max-w"
            value={content}
            onValueChange={(e) => setContent(e)}
          />
        </div>

        <Input
          type="text"
          label="Tags"
          className="max-w-xs mb-2"
          value={currentTag}
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            if (!currentTag.trim().length) return;
            addTag(currentTag);
            setCurrentTag("");
          }}
          onValueChange={(e) => setCurrentTag(e)}
        />

        <div className="max-w">
          {tags.map((tag) => (
            <Chip
              key={tag}
              onClose={() => removeTag(tag)}
              className="mb-1 mr-1"
              variant="flat"
            >
              {tag}
            </Chip>
          ))}
        </div>

        <div className="mt-2">
          <Button
            color="primary"
            className="mr-1"
            onPress={onSubmit}
            isLoading={isFetching}
          >
            Submit
          </Button>
          <Button variant="bordered" color="primary" onPress={onOpen}>
            Preview content
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onOpenChange} size="5xl">
        <ModalContent>
          <ModalHeader>Content preview</ModalHeader>
          <ModalBody>
            {
              <div className="prose lg:prose-xl dark:prose-invert">
                {isOpen && <Markdown>{content}</Markdown>}
              </div>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );

  return <></>;
};

export default CreatePostPage;
