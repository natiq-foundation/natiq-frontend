import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Material } from "@yakad/symbols"

import { DropdownButton } from "./DropdownButton"
import AppsMenu from "@/components/modules/apps/AppsMenu"
import { SideDrawer } from "./SideDrawer"
import { SettingsDropdown } from "./SettingsDropdown"
import OnlineStatus from "@/components/modules/status/OnlineStatus"

import { useTranslation } from "react-i18next"


type Props = {
  hideApps?: boolean
}


export function AppBar({ hideApps }: Props) {

  const { t } = useTranslation()


  const [drawerOpen, setDrawerOpen] = useState(false)
  const [appsOpen, setAppsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [statusVisible, setStatusVisible] = useState(true)



  useEffect(() => {

    const closeOnScroll = () => {
      setAppsOpen(false)
      setSettingsOpen(false)
    }


    window.addEventListener("scroll", closeOnScroll)


    return () => {
      window.removeEventListener("scroll", closeOnScroll)
    }

  }, [])



  return (
    <>

      <OnlineStatus
        onVisibleChange={setStatusVisible}
      />


      <header
        className={`
          fixed left-0 right-0 z-30
          flex justify-center px-4 pt-4
          backdrop-blur-md
          transition-all duration-300
          ${statusVisible ? "top-5" : "top-0"}
        `}
      >


        <div
          className="
            w-full max-w-6xl h-16 px-4
            flex items-center justify-between
            rounded-2xl
            bg-surface-container
            elevation-3
          "
        >


          {/* Left */}

          <div className="flex items-center">


            <button
              onClick={() => {
                setDrawerOpen(true)
                setAppsOpen(false)
                setSettingsOpen(false)
              }}
              className="
                p-2 rounded-full
                hover:bg-surface-container-high
                transition
              "
            >

              <Menu size={22} />

            </button>


            <span className="ml-3 font-medium text-sm tracking-wide">

              {t("appBar.title")}

            </span>


          </div>



          {/* Right */}

          <div className="flex items-center gap-1">


            {!hideApps && (

              <DropdownButton
                open={appsOpen}
                toggle={() => {
                  setAppsOpen(!appsOpen)
                  setSettingsOpen(false)
                }}
                close={() => setAppsOpen(false)}

                icon={
                  <Material
                    icon="apps"
                    filled={appsOpen}
                    type="round"
                    weight={500}
                    opticalSize={24}
                  />
                }

                width="w-[26rem] max-w-[calc(100vw-2rem)]"
              >

                <AppsMenu />

              </DropdownButton>

            )}



            <DropdownButton

              open={settingsOpen}

              toggle={() => {
                setSettingsOpen(!settingsOpen)
                setAppsOpen(false)
              }}

              close={() => setSettingsOpen(false)}

              icon={

                <Material
                  icon="settings"
                  filled={settingsOpen}
                  type="round"
                  weight={500}
                  opticalSize={24}
                />

              }

              width="w-60"

            >

              <SettingsDropdown />

            </DropdownButton>


          </div>


        </div>


      </header>



      <SideDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />


    </>
  )
}