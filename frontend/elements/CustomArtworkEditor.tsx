import React from "react";
import { Tab, Tabs } from "millennium-lib";

export class CustomArtworkEditor extends React.Component<{ gameIds: string[] }> {
  gameIds: string[];

  constructor(props: any) {
    super(props);

    console.log("Creating CustomArtworkEditor");
    console.log({ props });

    this.gameIds = props.gameIds;
  }

  render(): React.ReactNode {
    const tabList: Tab[] = [];
    this.gameIds.forEach((id) => {
      tabList.push({
        id: `game-${id}`,
        title: id,
        content: "This is for testing.",
      });
    });
    return (
      <Tabs
        tabs={tabList}
        activeTab={"test"}
        onShowTab={function (tab: string): void {
          console.log("Showed " + tab);
        }}
      ></Tabs>
    );
  }
}
