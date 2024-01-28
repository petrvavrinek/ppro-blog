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

type PostData = {
  title: string;
  tags: string[];
  content: string;
};

type Props = {
  onSubmit: (data: PostData) => void;
  initialPost?: Partial<PostData>;
};

const CreatePost = (props?: Props) => {
  const [title, setTitle] = useState<string>(props?.initialPost?.title ?? "");
  const [content, setContent] = useState(props?.initialPost?.content ?? "");
  const [tags, setTags] = useState<string[]>(props?.initialPost?.tags ?? []);
  const [currentTag, setCurrentTag] = useState("");
  const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure();

  const removeTag = (tag: string) =>
    setTags((tags) => tags.filter((e) => e != tag));
  const addTag = (tag: string) => setTags((tags) => [...tags, tag]);

  const onSubmit = async () => {
    // setIsFetching(true);

    // const data = await fetch<PostStatic>(`/post`, {
    //   method: "POST",
    //   body: {
    //     title,
    //     content,
    //     tags,
    //   },
    // });
    // setIsFetching(false);

    props?.onSubmit({ content, tags, title });
    // navigate(`/post/${data.slug}`);
  };

  return (
    <>
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
          <Button color="primary" className="mr-1" onPress={onSubmit}>
            Save
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
    </>
  );

  return <></>;
};

export default CreatePost;
