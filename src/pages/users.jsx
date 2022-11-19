import { useEffect, useState, useContext } from "react"
import Icon from './Icon'
import AppContext from "@/AppContext"
import Breadcrumbs from "./Breadcrumbs"
import AddButton from "./AddButton"
import { PencilAltIcon } from '@heroicons/react/solid'
import DeleteButton from "./DeleteButton"
import AddOntologist from "./AddOntologist"
import RowTabs from "./RowTabs"
import useTranslation from 'next-translate/useTranslation';
import { getCopyrightImage } from "@/components/copyleftandright/CopyrightsLicenses"
import LImage from "./LImage"
import FileImporter from "./LComponents/FileImporter"
import FileExporter from "./LComponents/FileExporter"
import setLanguage from "next-translate/setLanguage"
import UserRows from "@/components/UserRows"

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const Users = () => {
    const { userList, createUser, updateUser } = useContext(AppContext)
    useEffect(() => {
      if (currentDisplay) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setObject(currentDisplay)
        switch (currentDisplay.type) {
          case 'Ontology':
              setEditProps({
                hasDescription: true,
                hasTemplateTypes: true,
                hasAuthor: true,
                hasCopyright: true
              })
            break;          
          case 'Template':
              setEditProps({
                hasDescription: true,
                hasLanguage: true,
                hasIconStyle: true,
                hasListTypes: true
              })        
            break;          
          case 'List':
              setEditProps({
                hasDescription: true,
                hasPropertyTypes: true,
                hasStateTypes: true,
                hasItemTypes: true,
                hasStandalone: true,
              })          
            break;          
          case 'Item':
              setEditProps({
                hasDescription: true,
                hasPropertyTypes: true,
              })    
            break;          
          case 'State':
              setEditProps({
                hasDescription: true,
                hasPropertyTypes: true,
              })
            break;          
          case 'Property':
              setEditProps({
                hasDataType: true,
                hasExplanation: true,
                hasExample: true,
                hasReadonly: true,
                hasVisible: true,
                hasPermittedValues: true,
              })
            break;
          default:
            break;
          }
      }
      if (currentDisplay.language) {
        setLanguage(currentDisplay.language)
      }
      setLoading(false)
    }, [currentDisplay])
    
    function setObject(object) {
        switch (object.type) {
            case "Ontologies":
                setData(object)
                break;
            case "Ontology":
                setOntology(object)
                break;
            case "Template":
                setTemplateType(object)
                break;
            case "List":
                setListType(object)
                break;
            case "State":
                setStateType(object)
                break;
            case "Item":
                setItemType(object)
                break;
            case "Property":
                setPropertyType(object)
                break;
            default:
                break;
        }
    }

    const handleClick = (object) => {
        setLoading(true)
        setCurrentTab(0)
        setObject(object)
        setCurrentDisplay(object)
        setBreadCrumbs([...breadCrumbs, {object:object, displayName: `${object.title}`}])
      }

      const editObject = (object) => {
        setLoading(true)
        setEditToggle(true)
        setObject(object)
        setCurrentDisplay(object)
        setBreadCrumbs([...breadCrumbs, {object:object, displayName: `${object.title}`}])
      }

      const deleteObject = (object) => {
        switch (object.type) {
            case "Ontology":
                saveObject({updObject: object, type:'Ontology', delete: true})
                break;
            case "Template":
                saveObject({updObject: object, type:'Template', delete: true})
                break;
            case "List":
                saveObject({updObject: object, type:'List', delete: true})
                break;
            case "State":
                saveObject({updObject: object, type:'State', delete: true})
                break;
            case "Item":
                saveObject({updObject: object, type:'Item', delete: true})
                break;
            case "Property":
                saveObject({updObject: object, type:'Property', delete: true})
                break;
            default:
                break;
        }
    }
    
    return (
          <>
        <div className="container mx-auto flex flex-col justify-center w-10/12 items-center">
            <div className="p-4 max-w-md min-w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                  <h5 className="text-xl font-bold leading-none text-red-600 dark:text-white">Users</h5>
              </div>                {(currentDisplay && currentDisplay.type !== "Ontologies") ? 
                    (
                    <OntologistDisplay currentDisplay={currentDisplay} handleClick={handleClick} editProps={editProps} editObject={editObject} deleteObject={deleteObject}/>
                    ):(
                      <>

                      <AddButton type={t('Ontology')} currentObject={currentDisplay} />
                      {currentDisplay.ontologies.length > 0 ? (
                        <div className="flow-root">
                       <UserRows />
                        </div>
                        ):(null)}</>
                )}
            </div>
        </div>
        </>
    )
}


export default Ontologist